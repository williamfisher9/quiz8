from flask import jsonify
from google.cloud import pubsub_v1
import json

publisher = pubsub_v1.PublisherClient()

def flask_calc_pubsub(request):
    if request.method == 'OPTIONS':
        headers = {
            # 'Access-Control-Allow-Origin': 'https://mydomain.com',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
            # 'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    print(f"Function triggered and message was received")

    topic_name = 'food-order-topic'
    PROJECT_ID =  'keen-inscriber-345701'
    message = request.args.get("message")

    print(f"Received message is {message}")

    topic_path = publisher.topic_path(PROJECT_ID, topic_name)

    if request.args and 'message' in request.args:
        data = {
            'value': 'Success'
        }
    else:
        data = {
            'value': 'Failed!'
        }

    message_json = json.dumps({
        'data': {'message': message},
    })

    message_bytes = message_json.encode('utf-8')

    # Publishes a message
    try:
        publish_future = publisher.publish(topic_path, data=message_bytes)
        publish_future.result()  # Verify the publish succeeded
        response = jsonify({
            'data': 'Message published!'
        })
        response.headers.set('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        print(e)
        return (e, 500)

    

    