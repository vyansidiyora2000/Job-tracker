import json
import boto3
import logging
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('queAns')

# Setup logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def decipher_text(ciphertext, key):
    decrypted = ""
    for char in ciphertext:
        if char.isalpha():
            shift = 65 if char.isupper() else 97
            decrypted += chr((ord(char) - shift - key) % 26 + shift)
        else:
            decrypted += char
    return decrypted

def lambda_handler(event, context):
    try:
        email = event['email']
        answer = event['answer']
        random_text = event.get('randomText', '')
        additional_input = event.get('additionalInput', '')

        # Log all provided inputs for debugging purposes
        logger.info(f"Provided email: {email}")
        logger.info(f"Provided answer: {answer}")
        logger.info(f"Provided random text: {random_text}")
        logger.info(f"Provided additional input: {additional_input}")

        # Retrieve the stored answer and cipher key for the given email
        response = table.get_item(
            Key={
                'email': email
            }
        )

        if 'Item' in response:
            stored_answer = response['Item']['answer']
            cipher_key = int(response['Item'].get('cipher', '0'))  # Get cipher key as an integer from DynamoDB
            
            logger.info(f"Stored answer: {stored_answer}")
            logger.info(f"Cipher key: {cipher_key}")

            # Decipher the random text
            deciphered_text = decipher_text(random_text, cipher_key)
            logger.info(f"Deciphered text: {deciphered_text}")

            if answer == stored_answer and additional_input == deciphered_text:
                return {
                    'statusCode': 200,
                    'body': json.dumps({
                        'message': 'Login successful',
                        'randomText': random_text,
                        'additionalInput': additional_input
                    })
                }
            else:
                return {
                    'statusCode': 401,
                    'body': json.dumps('Incorrect answer or decryption')
                }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('No security question found for the specified email')
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
