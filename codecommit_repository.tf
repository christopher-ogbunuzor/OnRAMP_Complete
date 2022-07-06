resource "aws_codecommit_repository" "tfer--onramp_pipeline_cc_repo" {
  description     = "Repo for developing pipeline"
  repository_name = "onramp_pipeline_cc_repo"
}
