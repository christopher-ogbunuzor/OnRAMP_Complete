resource "aws_sns_topic" "tfer--checkTF_Plan" {
  application_success_feedback_sample_rate = "0"
  content_based_deduplication              = "false"
  fifo_topic                               = "false"
  firehose_success_feedback_sample_rate    = "0"
  http_success_feedback_sample_rate        = "0"
  lambda_success_feedback_sample_rate      = "0"
  name                                     = "checkTF_Plan"

  policy = <<POLICY
{
  "Id": "__default_policy_ID",
  "Statement": [
    {
      "Action": [
        "SNS:GetTopicAttributes",
        "SNS:SetTopicAttributes",
        "SNS:AddPermission",
        "SNS:RemovePermission",
        "SNS:DeleteTopic",
        "SNS:Subscribe",
        "SNS:ListSubscriptionsByTopic",
        "SNS:Publish"
      ],
      "Condition": {
        "StringEquals": {
          "AWS:SourceOwner": "314045000409"
        }
      },
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Resource": "arn:aws:sns:us-east-1:314045000409:checkTF_Plan",
      "Sid": "__default_statement_ID"
    }
  ],
  "Version": "2008-10-17"
}
POLICY

  sqs_success_feedback_sample_rate = "0"
}

resource "aws_sns_topic_subscription" "approvalAction" {
  topic_arn = aws_sns_topic.tfer--checkTF_Plan.arn
  protocol  = "email"
  endpoint  = "" #put email here
}
