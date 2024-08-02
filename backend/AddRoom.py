import json
import boto3
from decimal import Decimal
import base64
import uuid

def lambda_handler(event, context):
    # Parse the product data from the request body
    try:
        room = json.loads(event['body'])
        print(room)
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid request body', 'errorDetail': str(e)}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    
    # Ensure all required fields are present
    required_fields = ['roomId', 'roomType', 'roomPrice', 'roomFeatures']
    if not all(field in room for field in required_fields):
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Missing required room fields'}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    
    # Convert the productPrice and productRating to Decimal for DynamoDB
    try:
        room['roomId'] = Decimal(str(room['roomId']))
        room['roomPrice'] = Decimal(str(room['roomPrice']))
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid id or price format', 'errorDetail': str(e)}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    
    # Insert the new room into DynamoDB
    try:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('RoomsTable')
        table.put_item(Item=room)
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to insert room', 'errorDetail': str(e)}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    
    return {
        'statusCode': 201,
        'body': json.dumps({'message': 'Room added successfully'}),
        'headers': {
            'Content-Type': 'application/json'
        }
    }
