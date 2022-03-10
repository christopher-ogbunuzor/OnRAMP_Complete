module "createLandingZone" {
  source        = "git::https://github.com/chris-cloudreach/OnRAMP_Complete.git?ref=moduleVPC"
  vpc_cidr      = "192.168.0.0/16"
  vpc_name      = "OnRAMPvpcLOMDONREGION_module"
  IG_name       = "OnRAMPgateway_module"
  public_a_cidr = "192.168.11.0/24"
  region         = "eu-west-1"
  private_a_cidr = "192.168.21.0/24"

}

module "createEC2" {
  source        = "git::https://github.com/chris-cloudreach/OnRAMP_Complete.git?ref=moduleEC2"
key_name       = "ta-lab-key-module"
ami_id = data.aws_ami.my_aws_ami.id
ec2instancetype = "t2.micro"
subnet_idd = module.createLandingZone.public_subnet_a_id
ec2_SG = module.createLandingZone.SG_id
region = "eu-west-1"

}