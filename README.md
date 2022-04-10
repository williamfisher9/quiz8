# quiz8

## Functions deployment
### Calculator function
```
from flask import jsonify

def flask_calc_assignment(request):
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

    if request.args and 'operation' in request.args:
        operation = request.args.get('operation')
        first_operand = request.args.get('data1')
        second_operand = request.args.get('data2')
    if operation == 'sub':
        result = float(first_operand) - float(second_operand)
        data = {
            'value': str(result)
        }
    elif operation == 'add':
        result = float(first_operand) + float(second_operand)
        data = {
            'value': str(result)
        }
    elif operation == 'mul':
        result = float(first_operand) * float(second_operand)
        data = {
            'value': str(result)
        }
    elif operation == 'div':
        if float(second_operand) == 0:
            data = {
                'value': 'Div by Zero!'
            }
        else:
            result = float(first_operand) / float(second_operand)
            data = {
                'value': str(result)
            }

    else:
        data = {
            'value': 'No operation!'
        }

    response = jsonify({
        'data': data
    })

    response.headers.set('Access-Control-Allow-Origin', '*')
    return response
```
### Publisher function
```
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

```

* Create requirements.txt file and add the below dependency:
```
google-cloud-pubsub==2.8.0
```

## Frontend deployment
1. Copy the frontend folder to the Compute instance.
2. Install node by running the commands:
```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```
3. Move to the frontend folder.
4. Run the below commands:
```
npm install
npm start
```

## Frontend and backend links:
### Frontend:
```
http://34.135.0.129:3000/
```
### Backend:
```
https://us-central1-keen-inscriber-345701.cloudfunctions.net/python-flask-calc
https://us-central1-keen-inscriber-345701.cloudfunctions.net/flask-calc-pubsub
```
