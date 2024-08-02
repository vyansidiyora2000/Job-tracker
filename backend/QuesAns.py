import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('queAns')

def lambda_handler(event, context):
    print(f"Received event: {json.dumps(event)}")  
    
    try:
        email = event['email']
        question = event['question']
        answer = event['answer']
        cipher = event['cipher']
   
        valid_questions = [
            "What is your mother's name?",
            "What city were you born in?",
            "What is your favorite book?",
            "What is your pet's name?"
        ]
        
        if question not in valid_questions:
            return {
                'statusCode': 400,
                'body': json.dumps('Invalid security question')
            }
        
       
        response = table.put_item(
            Item={
                'email': email,
                'question': question,
                'answer': answer,
                'cipher': cipher,
            }
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps('Security question and answer stored successfully')
        }
    
    except KeyError as e:
        return {
            'statusCode': 400,
            'body': json.dumps(f'Missing required parameter: {str(e)}')
        }
    except ClientError as e:  
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {e.response["Error"]["Message"]}')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }

