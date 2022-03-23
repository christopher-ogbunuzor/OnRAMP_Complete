import boto3

def lambda_handler(event, context):

    sts_connection = boto3.client('sts')
    acct_b = sts_connection.assume_role(
        RoleArn="arn:aws:iam::736779967525:role/my-test-assume",
        RoleSessionName="copc547",
        ExternalId='chris'
    )
    print("this outputs the type of the object -> acct b")
    print(type(acct_b))
    
    ACCESS_KEY = acct_b['Credentials']['AccessKeyId']
    SECRET_KEY = acct_b['Credentials']['SecretAccessKey']
    SESSION_TOKEN = acct_b['Credentials']['SessionToken']

    # create service client using the assumed role credentials, e.g. S3
    client = boto3.client(
        's3',
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY,
        aws_session_token=SESSION_TOKEN,
    )

    response = client.list_buckets()
    
    # Output the bucket names
    print('Existing buckets:')
    for bucket in response['Buckets']:
        print(f'  {bucket["Name"]}')
        
    # output the caller identity
    #identity = sts_connection.get_caller_identity()
    print(acct_b['AssumedRoleUser'])
