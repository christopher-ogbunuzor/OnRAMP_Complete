terraform {
    backend "s3" {
      encrypt = true
      bucket =    "onramp-test-bucket7654122-tfstates"       #"onrampterrafrom"
      dynamodb_table = "terraform-state-lock-dynamo"
      key = "IacDevOps/terraform.tfstate"
      region = "eu-west-2"
  }
}


