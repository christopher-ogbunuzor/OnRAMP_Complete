terraform {
  backend "s3"{
      bucket = "onramp-test-bucket7654122-tfstates"
      key = "provisionWithTerraformModules/terraform.tfstate"
      dynamodb_table = "terraform-lock"
  }
}