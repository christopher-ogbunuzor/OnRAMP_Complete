terraform {
    backend "s3" {
      encrypt = true
      bucket = var.bucketName
      dynamodb_table = var.tableName
      key = var.tfstateKey
      region = var.region
  }
}