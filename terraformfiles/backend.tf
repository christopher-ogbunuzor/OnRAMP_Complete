terraform {
  backend "s3" {
    bucket         = "onramp-test-bucket7654122-tfstates"
    key            = "VPC_subnet_noRefactor/terraform.tfstate"
    dynamodb_table =          "terraform-lock"
  }
}