provider "aws" {
  region = "eu-west-2"
}

terraform {
	required_providers {
		aws = {
	    version = "~> 4.21.0"
		}
  }
}
