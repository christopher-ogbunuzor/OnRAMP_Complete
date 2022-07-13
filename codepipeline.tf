resource "aws_codepipeline" "tfer--Pipeline_TF_Plan_Apply" {
  artifact_store {
    location = "onrampterrafrom6789"
    type     = "S3"
  }

  name     = "Pipeline_TF_Plan_Apply"
  role_arn = aws_iam_role.codepipeline_role.arn

# stage {

#     name = "Source"
#     action {
#       category = "Source"

#       configuration = {
#         BranchName           = "main"
#         OutputArtifactFormat = "CODE_ZIP"
#         PollForSourceChanges = "false"
#         RepositoryName       = "https://github.com/chris-cloudreach/onramp-Ogbunuzor_Co.git"
#       }

#       name             = "Source"
#       namespace        = "SourceVariables"
#       output_artifacts = ["SourceArtifact"]
#       owner            = "ThirdParty"
#       provider         = "GITHUB"
#       region           = "eu-west-2"
#       run_order        = "1"
#       version          = "1"
#     }
#   }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["SourceArtifact"]

      configuration = {
        ConnectionArn        = "arn:aws:codestar-connections:" #put codestar_connection_arn
        FullRepositoryId     = "chris-cloudreach/onramp-Ogbunuzor_Co"
        BranchName           = "main"  #var.github_branch
        OutputArtifactFormat = "CODE_ZIP"
      }
    }
  }




stage {
    action {
      category = "Build"

      configuration = {
        ProjectName = aws_codebuild_project.tfer--Tfsec_Check.name
      }

      input_artifacts = ["SourceArtifact"]
      name            = "tfsec_check"
      owner           = "AWS"
      provider        = "CodeBuild"
      region          = "eu-west-2"
      run_order       = "1"
      version         = "1"
    }

    name = "TFSEC_CHECK"
  }

  stage {
    action {
      category = "Approval"

      configuration = {
        NotificationArn = aws_sns_topic.tfer--checkTF_Plan.arn
      }

      name      = "review_TFSEC_results"
      owner     = "AWS"
      provider  = "Manual"
      region    = "eu-west-2"
      run_order = "1"
      version   = "1"
    }

    name = "TFSEC_MANUAL_APPROVAL"
  }
  

  stage {
    action {
      category = "Build"

      configuration = {
        BatchEnabled = "false"
        ProjectName  = aws_codebuild_project.tfer--codebuildPlan.name
      }

      input_artifacts  = ["SourceArtifact"]
      name             = "BuildPlan_Infracost"
      namespace        = "BuildVariables"
      output_artifacts = ["BuildArtifact"]
      owner            = "AWS"
      provider         = "CodeBuild"
      region           = "eu-west-2"
      run_order        = "1"
      version          = "1"
    }

    name = "Build"
  }


    stage {
    action {
      category = "Approval"

      configuration = {
        NotificationArn = aws_sns_topic.tfer--checkTF_Plan.arn
      }

      name      = "planApproval"
      owner     = "AWS"
      provider  = "Manual"
      region    = "eu-west-2"
      run_order = "1"
      version   = "1"
    }

    name = "approveTFPlan"
  }

  

  stage {
    action {
      category = "Build"

      configuration = {
        ProjectName = aws_codebuild_project.tfer--codebuildApply.name
      }

      input_artifacts = ["SourceArtifact"]
      name            = "ApplyPlan"
      owner           = "AWS"
      provider        = "CodeBuild"
      region          = "eu-west-2"
      run_order       = "1"
      version         = "1"
    }

    name = "BuildApply"
  }

  
}
