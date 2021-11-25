from pymongo import MongoClient #pymongo접속
client = MongoClient('localhost', 27017) #지금 내 컴퓨터에 돌아가고 있는 mongodb 접속.
db = client.dbPOLED #dbPOLED라고 하는 이름으로 접속 할 것이다.(없으면 자동으로 만들어짐)

f = open("emobility/dummy.txt", "r")
lines = f.readlines()

# 표에 넣을 데이터
FileArray = []
i = 0
for line in lines:
    if i == len(lines): break
    t, vertical, Horizontal, theta = line.split()
    FileArray += [[t, vertical, Horizontal, theta]]
    i += 1
f.close()

for i in range(len(FileArray)):

    doc = {
        "Time": FileArray[i][0],
        "vertical": FileArray[i][1],
        "Horizontal": FileArray[i][2],
        "theta": FileArray[i][3]
    }
    db.users.insert_one(doc)
    print(doc)

# 그래프에 넣을 데이터
Dic_Vertical = {}
Dic_Horizontal = {}
Dic_theta = {}

i = 0
for line in lines:
    if i == len(lines): break
    t, vertical, Horizontal, theta = line.split()
    Dic_Vertical[t] = int(vertical)
    Dic_Horizontal[t] = int(Horizontal)
    Dic_theta[t] = int(theta)
    i += 1
print(Dic_Vertical)
f.close()

# 그래프에 넣을 데이터 time&x
for i in Dic_Vertical.keys():
    doc = {
        "Time": i,
        "Vertical": Dic_Vertical[i]
    }
    db.GRAPH_x.insert_one(doc)
    print(doc)

# 그래프에 넣을 데이터 time&y
for i in Dic_Horizontal.keys():
    doc = {
        "Time": i,
        "Horizontal": Dic_Horizontal[i]
    }
    db.GRAPH_y.insert_one(doc)
    print(doc)

# 그래프에 넣을 데이터 time&theta
for i in Dic_theta.keys():
    doc = {
        "Time": i,
        "Theta": Dic_theta[i]
    }
    db.GRAPH_theta.insert_one(doc)
    print(doc)

