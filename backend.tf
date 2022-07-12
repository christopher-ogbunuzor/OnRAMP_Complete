terraform {
    backend "s3" {
      encrypt = true
      bucket =    ""       #"bucket name"
      dynamodb_table = ""  #"dynamodb table name"
      key = ""   #"s3 key for statefile "
      region = "" #region
  }
}


