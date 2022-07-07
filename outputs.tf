output "aws_codebuild_project_tfer--Tfsec_Check_id" {
  value = aws_codebuild_project.tfer--Tfsec_Check.id
}

output "aws_codebuild_project_tfer--codebuildApply_id" {
  value = aws_codebuild_project.tfer--codebuildApply.id
}

output "aws_codebuild_project_tfer--codebuildPlan_id" {
  value = aws_codebuild_project.tfer--codebuildPlan.id
}

output "aws_codecommit_repository_tfer--onramp_pipeline_cc_repo_id" {
  value = aws_codecommit_repository.tfer--onramp_pipeline_cc_repo.id
}

output "aws_codepipeline_tfer--Pipeline_TF_Plan_Apply_id" {
  value = aws_codepipeline.tfer--Pipeline_TF_Plan_Apply.id
}

# output "aws_dynamodb_table_tfer--terraform-state-lock-dynamo_id" {
#   value = aws_dynamodb_table.tfer--terraform-state-lock-dynamo.id
# }

output "aws_sns_topic_tfer--checkTF_Plan_id" {
  value = aws_sns_topic.tfer--checkTF_Plan.id
}

# output "aws_s3_bucket_tfer--onramp-test-bucket7654122-tfstates_id" {
#   value = aws_s3_bucket.tfer--onramp-test-bucket7654122-tfstates.id
# }
