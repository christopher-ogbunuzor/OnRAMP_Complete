from __future__ import print_function
import json
def lambda_handler(event, context):
    #print("Customer details -->", record['formData'])
    for record in event['Records']:
        customer_details = record['dynamodb']['NewImage']['formData']['S']
        Customerdict = json.loads(customer_details)
        email = Customerdict['email']
        account = Customerdict['AccountNumber']
        externalid = Customerdict['ext_id']
        region = Customerdict['region']
        print("Customer email is: ", Customerdict['email'])
        print("Customer AWS Account number is: ", Customerdict['AccountNumber'])
        print("Customer external id is: ", Customerdict['ext_id'])
        print("Customer VPC CIDR is: ", Customerdict['cidr'])
        print("Customer AWS region is: ", Customerdict['region'])
        #print("Customer detail type is: ", type(Customerdict))
        
        
    #print('Successfully processed %s records.' % str(len(event['Records'])))
