import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal

def retrieve_rooms():
    rooms_table_name = 'RoomsTable'
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(rooms_table_name)
    
    try:
        response = table.scan()
        items = response.get('Items', [])
        return items
    except Exception as e:
        error_message = f"Failed to retrieve rooms from DynamoDB: {str(e)}"
        print(error_message)
        raise Exception(error_message)

def convert_decimals(obj):
    if isinstance(obj, list):
        return [convert_decimals(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: convert_decimals(value) for key, value in obj.items()}
    elif isinstance(obj, Decimal):
        # Convert Decimals to float
        return float(obj)
    else:
        return obj

def lambda_handler(event, context):
    try:
        all_rooms = retrieve_rooms()
        all_rooms = convert_decimals(all_rooms)  # Convert Decimal types before serialization

        origin = event.get('headers', {}).get('Origin', '')
        response_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET'
        }
        
        if origin:
            response_headers['Access-Control-Allow-Origin'] = origin
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Rooms retrieval successful.', 'rooms': all_rooms}),
            'headers': response_headers,
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Failed to retrieve rooms', 'errorDetail': str(e)}),
            'headers': {
                'Content-Type': 'application/json'
            },
        }
