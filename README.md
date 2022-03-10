# OnRAMP_Complete## Requirements

No requirements.

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | 4.4.0 |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_createEC2"></a> [createEC2](#module\_createEC2) | git::https://github.com/chris-cloudreach/OnRAMP_Complete.git | moduleEC2 |
| <a name="module_createLandingZone"></a> [createLandingZone](#module\_createLandingZone) | git::https://github.com/chris-cloudreach/OnRAMP_Complete.git | moduleVPC |

## Resources

| Name | Type |
|------|------|
| [aws_ami.my_aws_ami](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/ami) | data source |

## Inputs

No inputs.

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_my_public_server_ip"></a> [my\_public\_server\_ip](#output\_my\_public\_server\_ip) | n/a |
