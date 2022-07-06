resource "aws_iam_role" "tfer--AWSCodePipelineServiceRole-us-east-1-Pipeline_TF_Plan_Apply" {
  assume_role_policy = <<POLICY
{
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      }
    }
  ],
  "Version": "2012-10-17"
}
POLICY

  managed_policy_arns  = [ 
                          "arn:aws:iam::aws:policy/AmazonS3FullAccess", 
                          "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess",
                          "arn:aws:iam::aws:policy/AWSCodeBuildDeveloperAccess",
                          "arn:aws:iam::aws:policy/AWSCodeCommitFullAccess"]
  max_session_duration = "3600"
  name                 = "AWSCodePipelineServiceRole-us-east-1-Pipeline_TF_Plan_Apply"
  path                 = "/service-role/"

  tags = {
    Name   = "cp"
    cbrole = "pipeline"
  }

  tags_all = {
    Name   = "cp"
    cbrole = "pipeline"
  }
}

resource "aws_iam_role" "tfer--codebuild-codebuildApply-service-role" {
  assume_role_policy = <<POLICY
{
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      }
    }
  ],
  "Version": "2012-10-17"
}
POLICY

  # inline_policy {
  #   name   = "comdeapplythingy"
  #   policy = "{\n    \"Version\": \"2012-10-17\",\n    \"Statement\": [\n        {\n            \"Sid\": \"VisualEditor0\",\n            \"Effect\": \"Allow\",\n            \"Action\": [\n                \"s3:ListAccessPointsForObjectLambda\",\n                \"s3:DeleteAccessPoint\",\n                \"s3:DeleteAccessPointForObjectLambda\",\n                \"s3:DeleteJobTagging\",\n                \"s3:PutLifecycleConfiguration\",\n                \"s3:PutObjectTagging\",\n                \"s3:DeleteObject\",\n                \"s3:CreateMultiRegionAccessPoint\",\n                \"s3:PutAccessPointPolicyForObjectLambda\",\n                \"s3:PutAccountPublicAccessBlock\",\n                \"s3:GetBucketWebsite\",\n                \"s3:PutMultiRegionAccessPointPolicy\",\n                \"s3:DeleteStorageLensConfigurationTagging\",\n                \"s3:GetMultiRegionAccessPoint\",\n                \"s3:GetObjectAttributes\",\n                \"s3:DeleteObjectVersionTagging\",\n                \"s3:InitiateReplication\",\n                \"s3:GetObjectLegalHold\",\n                \"s3:GetBucketNotification\",\n                \"s3:DeleteBucketPolicy\",\n                \"s3:GetReplicationConfiguration\",\n                \"s3:DescribeMultiRegionAccessPointOperation\",\n                \"s3:PutObject\",\n                \"s3:PutBucketNotification\",\n                \"s3:PutObjectVersionAcl\",\n                \"s3:PutAccessPointPublicAccessBlock\",\n                \"s3:PutBucketObjectLockConfiguration\",\n                \"s3:PutAccessPointPolicy\",\n                \"s3:GetStorageLensDashboard\",\n                \"s3:GetLifecycleConfiguration\",\n                \"s3:GetBucketTagging\",\n                \"s3:GetInventoryConfiguration\",\n                \"s3:GetAccessPointPolicyForObjectLambda\",\n                \"s3:ReplicateTags\",\n                \"s3:ListBucket\",\n                \"s3:AbortMultipartUpload\",\n                \"s3:PutBucketTagging\",\n                \"s3:UpdateJobPriority\",\n                \"s3:DeleteBucket\",\n                \"s3:PutBucketVersioning\",\n                \"s3:GetMultiRegionAccessPointPolicyStatus\",\n                \"s3:ListBucketMultipartUploads\",\n                \"s3:PutIntelligentTieringConfiguration\",\n                \"s3:PutMetricsConfiguration\",\n                \"s3:PutStorageLensConfigurationTagging\",\n                \"s3:PutObjectVersionTagging\",\n                \"s3:GetBucketVersioning\",\n                \"s3:GetAccessPointConfigurationForObjectLambda\",\n                \"s3:PutInventoryConfiguration\",\n                \"s3:ObjectOwnerOverrideToBucketOwner\",\n                \"s3:GetStorageLensConfiguration\",\n                \"s3:DeleteStorageLensConfiguration\",\n                \"s3:GetAccountPublicAccessBlock\",\n                \"s3:PutBucketWebsite\",\n                \"s3:ListAllMyBuckets\",\n                \"s3:PutBucketRequestPayment\",\n                \"s3:PutObjectRetention\",\n                \"s3:CreateAccessPointForObjectLambda\",\n                \"s3:GetBucketCORS\",\n                \"s3:DeleteAccessPointPolicy\",\n                \"s3:GetObjectVersion\",\n                \"s3:PutAnalyticsConfiguration\",\n                \"s3:PutAccessPointConfigurationForObjectLambda\",\n                \"s3:GetObjectVersionTagging\",\n                \"s3:PutStorageLensConfiguration\",\n                \"s3:CreateBucket\",\n                \"s3:GetStorageLensConfigurationTagging\",\n                \"s3:ReplicateObject\",\n                \"s3:GetObjectAcl\",\n                \"s3:GetBucketObjectLockConfiguration\",\n                \"s3:DeleteBucketWebsite\",\n                \"s3:GetIntelligentTieringConfiguration\",\n                \"s3:DeleteAccessPointPolicyForObjectLambda\",\n                \"s3:GetObjectVersionAcl\",\n                \"s3:PutBucketAcl\",\n                \"s3:DeleteObjectTagging\",\n                \"s3:GetBucketPolicyStatus\",\n                \"s3:GetObjectRetention\",\n                \"s3:GetJobTagging\",\n                \"s3:ListJobs\",\n                \"s3:PutObjectLegalHold\",\n                \"s3:PutBucketCORS\",\n                \"s3:ListMultipartUploadParts\",\n                \"s3:GetObject\",\n                \"s3:DescribeJob\",\n                \"s3:PutBucketLogging\",\n                \"s3:GetAnalyticsConfiguration\",\n                \"s3:GetObjectVersionForReplication\",\n                \"s3:GetAccessPointForObjectLambda\",\n                \"s3:CreateAccessPoint\",\n                \"s3:GetAccessPoint\",\n                \"s3:PutAccelerateConfiguration\",\n                \"s3:DeleteObjectVersion\",\n                \"s3:GetBucketLogging\",\n                \"s3:ListBucketVersions\",\n                \"s3:RestoreObject\",\n                \"s3:GetAccelerateConfiguration\",\n                \"s3:GetObjectVersionAttributes\",\n                \"s3:GetBucketPolicy\",\n                \"s3:PutEncryptionConfiguration\",\n                \"s3:GetEncryptionConfiguration\",\n                \"s3:GetObjectVersionTorrent\",\n                \"s3:GetBucketRequestPayment\",\n                \"s3:GetAccessPointPolicyStatus\",\n                \"s3:GetObjectTagging\",\n                \"s3:GetBucketOwnershipControls\",\n                \"s3:GetMetricsConfiguration\",\n                \"s3:PutObjectAcl\",\n                \"s3:GetBucketPublicAccessBlock\",\n                \"s3:PutBucketPublicAccessBlock\",\n                \"s3:GetMultiRegionAccessPointPolicy\",\n                \"s3:GetAccessPointPolicyStatusForObjectLambda\",\n                \"s3:ListAccessPoints\",\n                \"s3:PutBucketOwnershipControls\",\n                \"s3:DeleteMultiRegionAccessPoint\",\n                \"s3:PutJobTagging\",\n                \"s3:ListMultiRegionAccessPoints\",\n                \"s3:UpdateJobStatus\",\n                \"s3:GetBucketAcl\",\n                \"s3:BypassGovernanceRetention\",\n                \"s3:ListStorageLensConfigurations\",\n                \"s3:GetObjectTorrent\",\n                \"s3:PutBucketPolicy\",\n                \"s3:GetBucketLocation\",\n                \"s3:GetAccessPointPolicy\",\n                \"s3:ReplicateDelete\"\n            ],\n            \"Resource\": \"*\"\n        }\n    ]\n}"
  # }

  managed_policy_arns  = ["arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess", 
                          "arn:aws:iam::aws:policy/AmazonS3FullAccess", 
                          "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess",
                          "arn:aws:iam::aws:policy/AWSCodeBuildDeveloperAccess",
                          "arn:aws:iam::aws:policy/AWSCodeCommitFullAccess"]
  max_session_duration = "3600"
  name                 = "codebuild-codebuildApply-service-role"
  path                 = "/service-role/"

  tags = {
    cbrole = "Apply"
  }

  tags_all = {
    cbrole = "Apply"
  }
}

resource "aws_iam_role" "tfer--codebuild-codebuildPlan-service-role" {
  assume_role_policy = <<POLICY
{
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      }
    }
  ],
  "Version": "2012-10-17"
}
POLICY

  # inline_policy {
  #   name   = "getParams"
  #   policy = "{\n    \"Version\": \"2012-10-17\",\n    \"Statement\": [\n        {\n            \"Sid\": \"VisualEditor0\",\n            \"Effect\": \"Allow\",\n            \"Action\": \"ssm:GetParameters\",\n            \"Resource\": \"arn:aws:ssm:*:314045000409:parameter/*\"\n        }\n    ]\n}"
  # }

  managed_policy_arns  = ["arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess", 
                          "arn:aws:iam::aws:policy/AmazonS3FullAccess", 
                          "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess",
                          "arn:aws:iam::aws:policy/AWSCodeBuildDeveloperAccess",
                          "arn:aws:iam::aws:policy/AWSCodeCommitFullAccess"
                          ]
  max_session_duration = "3600"
  name                 = "codebuild-codebuildPlan-service-role"
  path                 = "/service-role/"

  tags = {
    Name   = "cbPlan"
    cbrole = "Plan"
  }

  tags_all = {
    Name   = "cbPlan"
    cbrole = "Plan"
  }
}
