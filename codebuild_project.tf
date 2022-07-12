resource "aws_codebuild_project" "tfer--Tfsec_Check" {
  artifacts {
    encryption_disabled    = "true"
    location               = "" #"bucket name"
    name                   = "TFSEC_ATRF"
    namespace_type         = "NONE"
    override_artifact_name = "false"
    packaging              = "NONE"
    type                   = "S3"
  }

  badge_enabled = "false"
  build_timeout = "60"

  cache {
    type = "NO_CACHE"
  }

  concurrent_build_limit = "1"
  description            = "Check tf files using TFSEC"

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:5.0"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = "false"
    type                        = "LINUX_CONTAINER"
  }

  logs_config {
    cloudwatch_logs {
      status = "ENABLED"
    }

    # s3_logs {
    #   encryption_disabled = "false"
    #   status              = "DISABLED"
    # }
  }

  name               = "Tfsec_Check"
  project_visibility = "PRIVATE"
  queued_timeout     = "480"
  service_role       = aws_iam_role.tfer--codebuild-codebuildPlan-service-role.arn

  source {
    buildspec       = "buildspec_tfsec.yml"
    git_clone_depth = "1"

    git_submodules_config {
      fetch_submodules = "false"
    }

    insecure_ssl        = "false"
    location            = aws_codecommit_repository.tfer--onramp_pipeline_cc_repo.clone_url_http
    report_build_status = "false"
    type                = "CODECOMMIT"
  }

  source_version = "refs/heads/master"
}

resource "aws_codebuild_project" "tfer--codebuildApply" {
  artifacts {
    encryption_disabled    = "true"
    location               = ""  #"bucket name"
    name                   = "codebuildApply"
    namespace_type         = "BUILD_ID"
    override_artifact_name = "false"
    packaging              = "NONE"
    type                   = "S3"
  }

  badge_enabled = "false"
  build_timeout = "60"

  cache {
    type = "NO_CACHE"
  }

  concurrent_build_limit = "1"
  description            = "This is code build project for terraform apply"

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"

    environment_variable {
      name  = "TF_COMMAND_A"
      type  = "PLAINTEXT"
      value = "apply"
    }

    image                       = "aws/codebuild/standard:5.0"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = "false"
    type                        = "LINUX_CONTAINER"
  }

  logs_config {
    cloudwatch_logs {
      status = "ENABLED"
    }

    s3_logs {
      encryption_disabled = "false"
      status              = "DISABLED"
    }
  }

  name               = "codebuildApply"
  project_visibility = "PRIVATE"
  queued_timeout     = "480"
  service_role       = aws_iam_role.tfer--codebuild-codebuildApply-service-role.arn

  source {
    buildspec       = "buildspec_apply.yml"
    git_clone_depth = "1"

    git_submodules_config {
      fetch_submodules = "false"
    }

    insecure_ssl        = "false"
    location            = aws_codecommit_repository.tfer--onramp_pipeline_cc_repo.clone_url_http
    report_build_status = "false"
    type                = "CODECOMMIT"
  }

  source_version = "refs/heads/master"
}

resource "aws_codebuild_project" "tfer--codebuildPlan" {
  artifacts {
    encryption_disabled    = "true"
    location               = "onrampterrafrom"
    name                   = "codebuildPlan"
    namespace_type         = "BUILD_ID"
    override_artifact_name = "false"
    packaging              = "NONE"
    type                   = "S3"
  }

  badge_enabled = "false"
  build_timeout = "60"

  cache {
    type = "NO_CACHE"
  }

  concurrent_build_limit = "1"
  description            = "code build project for terraform inti and plan"

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"

    environment_variable {
      name  = "INFRACOST_API_KEY"
      type  = "PLAINTEXT"
      value = "ATMJxktNkCOXRwJTwzIlM10vDHPxQYsi"
    }

    environment_variable {
      name  = "TF_COMMAND_P"
      type  = "PLAINTEXT"
      value = "plan"
    }

    image                       = "aws/codebuild/standard:5.0"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = "false"
    type                        = "LINUX_CONTAINER"
  }

  logs_config {
    cloudwatch_logs {
      status = "ENABLED"
    }

    s3_logs {
      encryption_disabled = "false"
      status              = "DISABLED"
    }
  }

  name               = "codebuildPlan"
  project_visibility = "PRIVATE"
  queued_timeout     = "480"
  service_role       = aws_iam_role.tfer--codebuild-codebuildPlan-service-role.arn

  source {
    buildspec       = "buildspec_plan.yml"
    git_clone_depth = "1"

    git_submodules_config {
      fetch_submodules = "false"
    }

    insecure_ssl        = "false"
    location            = aws_codecommit_repository.tfer--onramp_pipeline_cc_repo.clone_url_http
    report_build_status = "false"
    type                = "CODECOMMIT"
  }

  source_version = "refs/heads/master"
}
