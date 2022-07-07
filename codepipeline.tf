resource "aws_codepipeline" "tfer--Pipeline_TF_Plan_Apply" {
  artifact_store {
    location = "onrampterrafrom"
    type     = "S3"
  }

  name     = "Pipeline_TF_Plan_Apply"
  role_arn = aws_iam_role.tfer--AWSCodePipelineServiceRole-us-east-1-Pipeline_TF_Plan_Apply.arn

stage {
    name = "Source"
    action {
      category = "Source"

      configuration = {
        BranchName           = "master"
        OutputArtifactFormat = "CODE_ZIP"
        PollForSourceChanges = "false"
        RepositoryName       = aws_codecommit_repository.tfer--onramp_pipeline_cc_repo.repository_name
      }

      name             = "Source"
      namespace        = "SourceVariables"
      output_artifacts = ["SourceArtifact"]
      owner            = "AWS"
      provider         = "CodeCommit"
      region           = "eu-west-2"
      run_order        = "1"
      version          = "1"
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
