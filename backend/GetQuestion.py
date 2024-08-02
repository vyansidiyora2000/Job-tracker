import json
import boto3
import logging
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('queAns')


logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    try:
      
        logger.info('Event: %s', json.dumps(event))
        
 
        email = event.get("email")
        print(email,"email")
        
        if not email:
            return {
                'statusCode': 400,
                'body': json.dumps('Email parameter is missing')
            }
        
       
        response = table.get_item(
            Key={
                'email': email
            }
        )
        
      
        if 'Item' in response:
            item = response['Item']
            question = item['question']
            
            response_final = {'email':email,'question':question}
            
        
            return {
                'statusCode': 200,
                'body': response_final
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('Question not found for the specified email')
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
