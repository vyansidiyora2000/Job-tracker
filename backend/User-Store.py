import json
import boto3


# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('User-store')  # Replace 'Users' with your DynamoDB table name

def lambda_handler(event, context):
    try:
        # Parse input from event
        name = event['name']
        email = event['email']
        
        
        # Store name and email in DynamoDB
        response = table.put_item(
            Item={
                'email': email,
                'name': name
            }
        )
        
        # Return success response
        return {
            'statusCode': 200,
            'body': json.dumps('User data stored successfully')
        }
    except ClientError as e:
        # Return error response if DynamoDB operation fails
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {e.response['Error']['Message']}")
        }
    except Exception as e:
        # Return error response for any other unexpected errors
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}")
        }

