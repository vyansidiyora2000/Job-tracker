import json
import boto3
from botocore.exceptions import ClientError

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')  # Specify the correct region
table = dynamodb.Table('User-store')  # Replace with your DynamoDB table name

def lambda_handler(event, context):
    print("Received event:", event)  # Debugging line

    # Check if query string parameters exist
    if 'queryStringParameters' not in event or not event['queryStringParameters']:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid request: email parameter is required in query string'})
        }

    # Extract the email from the query parameters
    email = event['queryStringParameters'].get('email')

    if not email:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid request: email parameter is required'})
        }

    # Query DynamoDB for the user profile
    try:
        response = table.get_item(Key={'email': email})
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'User profile not found for the specified email'})
            }

        # Extract email and name from DynamoDB item
        user_profile = response['Item']
        email = user_profile.get('email')
        name = user_profile.get('name')

        # Return the user profile with email and name
        return {
            'statusCode': 200,
            'body': json.dumps({
                'email': email,
                'name': name
            })
        }
    except ClientError as e:
        error_message = f"Error fetching user profile: {str(e)}"
        print(error_message)  # Log detailed error message
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error fetching user profile'})
        }
    except KeyError as e:
        print(f"Error extracting email from query parameters: {e}")  # Debugging line
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid request: email parameter is required'})
        }
