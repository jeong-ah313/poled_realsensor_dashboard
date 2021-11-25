from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbPOLED

## HTML 화면 보여주기
@app.route('/')
def homework():
    return render_template('dash.html')


####################
#DB불러오기-표
@app.route('/TABULATE', methods=['GET'])
def read_reviews():
    data = list(db.users.find({}, {'_id': False}))
    return jsonify({'all_data': data})

#DB불러오기-그래프x,y,theta
@app.route('/GRAPH_X', methods=['GET'])
def read_reviews_X():
    data = list(db.GRAPH_x.find({}, {'_id': False}))
    return jsonify({'all_X': data})

#DB불러오기-그래프y
@app.route('/GRAPH_Y', methods=['GET'])
def read_reviews_Y():
    data = list(db.GRAPH_y.find({}, {'_id': False}))
    return jsonify({'all_Y': data})

#DB불러오기-그래프theta
@app.route('/GRAPH_theta', methods=['GET'])
def read_reviews_Theta():
    data = list(db.GRAPH_theta.find({}, {'_id': False}))
    return jsonify({'all_theta': data})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
