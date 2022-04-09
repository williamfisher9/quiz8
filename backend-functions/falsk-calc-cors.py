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