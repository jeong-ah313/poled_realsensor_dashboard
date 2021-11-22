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
@app.route('/review', methods=['GET'])
def read_reviews():
    reviews = list(db.users.find({}, {'_id': False}))
    return jsonify({'all_reviews': reviews})

#DB불러오기-그래프x,y,theta
@app.route('/review_X', methods=['GET'])
def read_reviews_X():
    reviews = list(db.GRAPH_x.find({}, {'_id': False}))
    return jsonify({'all_X': reviews})

#DB불러오기-그래프y
@app.route('/review_Y', methods=['GET'])
def read_reviews_Y():
    reviews = list(db.GRAPH_y.find({}, {'_id': False}))
    return jsonify({'all_Y': reviews})

#DB불러오기-그래프theta
@app.route('/review_theta', methods=['GET'])
def read_reviews_Theta():
    reviews = list(db.GRAPH_theta.find({}, {'_id': False}))
    return jsonify({'all_theta': reviews})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
