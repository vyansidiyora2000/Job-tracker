import json
import boto3
from botocore.exceptions import ClientError

def initialize_dynamodb():
    """Initialize a DynamoDB resource."""
    return boto3.resource('dynamodb')

def extract_room_details(roomDeets):
    """Extract room details from the event."""

    return (
        roomDeets.roomId,
        roomDeets.roomType,
        roomDeets.price,
        roomDeets.features
    )

def validate_room_details(roomDeets):
    """Validate the extracted room details."""
    missing_parameters = []
    if not roomDeets.room_id:
        missing_parameters.append('roomId')
    if not roomDeets.room_type:
        missing_parameters.append('roomType')
    if not roomDeets.price:
        missing_parameters.append('price')
    if not roomDeets.features:
        missing_parameters.append('features')
    return missing_parameters

def prepare_room_data(room_id, room_type, price, features):
    """Prepare the room data for insertion into DynamoDB."""
    return {
        'roomId': room_id,
        'RoomType': room_type,
        'Price': price,
        'Features': features
    }

def insert_room_to_dynamodb(table, room_data):
    """Insert the room data into DynamoDB."""
    table.put_item(Item=room_data)

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    dynamodb = boto3.resource('dynamodb') # Initialize DynamoDB resource
    table = dynamodb.Table('Rooms') # Select your DynamoDB table

    try:
      roomDeets = json.loads(event['body'])
    except Exception as e:
      return {
          'statusCode': 400,
          'body': json.dumps({'message': 'Invalid request body', 'errorDetail': str(e)}),
          'headers': {
              'Content-Type': 'application/json'
          }
      }

    # Validate the input data
    missing_parameters = validate_room_details(roomDeets)
    if missing_parameters:
        return {
            'statusCode': 400,
            'body': json.dumps({
                'error': 'Missing required parameters',
                'missingParameters': missing_parameters
            })
        }

    room_id, room_type, price, features = extract_room_details(event) # Extract room details from the event    

    # Prepare the room data
    room_data = prepare_room_data(room_id, room_type, price, features)

    # Put the item into the DynamoDB table
    try:
        insert_room_to_dynamodb(table, room_data)
        return {
            'statusCode': 200,
            'body': json.dumps('Room added successfully')
        }

    except ClientError as e:
        print("ClientError: " + str(e))
        return {
            'statusCode': 500,
            'body': json.dumps('Error adding room: ' + str(e))
        }
    except Exception as e:
        print("Exception: " + str(e))
        return {
            'statusCode': 500,
            'body': json.dumps('Error: ' + str(e))
        }
