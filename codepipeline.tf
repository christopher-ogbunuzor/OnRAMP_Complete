resource "aws_codepipeline" "tfer--Pipeline_TF_Plan_Apply" {
  artifact_store {
    location = "codepipeline-us-east-1-187050563254"
    type     = "S3"
  }

  name     = "Pipeline_TF_Plan_Apply"
  role_arn = "arn:aws:iam::314045000409:role/service-role/AWSCodePipelineServiceRole-us-east-1-Pipeline_TF_Plan_Apply"

  stage {
    action {
      category = "Approval"

      configuration = {
        NotificationArn = "arn:aws:sns:us-east-1:314045000409:checkTF_Plan"
      }

      name      = "planApproval"
      owner     = "AWS"
      provider  = "Manual"
      region    = "us-east-1"
      run_order = "1"
      version   = "1"
    }

    name = "approveTFPlan"
  }

  stage {
    action {
      category = "Approval"

      configuration = {
        NotificationArn = "arn:aws:sns:us-east-1:314045000409:checkTF_Plan"
      }

      name      = "review_TFSEC_results"
      owner     = "AWS"
      provider  = "Manual"
      region    = "us-east-1"
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
        ProjectName  = "codebuildPlan"
      }

      input_artifacts  = ["SourceArtifact"]
      name             = "BuildPlan_Infracost"
      namespace        = "BuildVariables"
      output_artifacts = ["BuildArtifact"]
      owner            = "AWS"
      provider         = "CodeBuild"
      region           = "us-east-1"
      run_order        = "1"
      version          = "1"
    }

    name = "Build"
  }

  stage {
    action {
      category = "Build"

      configuration = {
        ProjectName = "Tfsec_Check"
      }

      input_artifacts = ["SourceArtifact"]
      name            = "tfsec_check"
      owner           = "AWS"
      provider        = "CodeBuild"
      region          = "us-east-1"
      run_order       = "1"
      version         = "1"
    }

    name = "TFSEC_CHECK"
  }

  stage {
    action {
      category = "Build"

      configuration = {
        ProjectName = "codebuildApply"
      }

      input_artifacts = ["SourceArtifact"]
      name            = "ApplyPlan"
      owner           = "AWS"
      provider        = "CodeBuild"
      region          = "us-east-1"
      run_order       = "1"
      version         = "1"
    }

    name = "BuildApply"
  }

  stage {
    action {
      category = "Source"

      configuration = {
        BranchName           = "master"
        OutputArtifactFormat = "CODE_ZIP"
        PollForSourceChanges = "false"
        RepositoryName       = "onramp_pipeline_cc_repo"
      }

      name             = "Source"
      namespace        = "SourceVariables"
      output_artifacts = ["SourceArtifact"]
      owner            = "AWS"
      provider         = "CodeCommit"
      region           = "us-east-1"
      run_order        = "1"
      version          = "1"
    }

    name = "Source"
  }
}
