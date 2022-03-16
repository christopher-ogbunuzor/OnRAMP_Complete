#!/bin/bash
echo "please enter sessionName externalId roleARN"
read sessionName externalId roleARN

aws sts assume-role --role-session-name $sessionName --external-id $externalId --role-arn $roleARN | jq > ./assumeRoleoutput.json

accessKeyId=`cat ./assumeRoleoutput.json | jq .Credentials.AccessKeyId | cut -d'"' -f2`
secretKey=`cat ./assumeRoleoutput.json | jq .Credentials.SecretAccessKey | cut -d'"' -f2`
sessionToken=`cat ./assumeRoleoutput.json | jq .Credentials.SessionToken | cut -d'"' -f2`

# echo "accesskeyid is $accessKeyId"
# echo "secret is: $secretKey"
# echo "session token is: $sessionToken"

echo"unsetting stuffs"
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_SESSION_TOKEN

echo "setting env var: Access key"
export AWS_ACCESS_KEY_ID=$accessKeyId
printenv | grep AWS_ACCESS_KEY_ID

echo "setting env var: secret key"
export AWS_SECRET_ACCESS_KEY=$secretKey
printenv | grep AWS_SECRET_ACCESS_KEY

echo "setting env var: session token"
export AWS_SESSION_TOKEN=$sessionToken
printenv | grep AWS_SESSION_TOKEN


aws s3 ls
aws sts get-caller-identity | jq
# SAMPLE USER INPUT: session copc547 arn:aws:iam::CUST_ACCT_NUM:role/Role-to-assume

