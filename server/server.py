from flask import Flask, request
from rollercoasters import RollerCoasterDB

app = Flask(__name__)


@app.route("/reviews/<int:coaster_id>", methods=["OPTIONS"])
def handle_cors_options(coaster_id):
    return "", 204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type"
    }

@app.route("/reviews", methods=["GET"])
def retrieve_coasters():
    db = RollerCoasterDB("rollercoasters_db.db")
    ROLLERCOASTERS = db.getRollerCoasters()
    return ROLLERCOASTERS, 200, {"Access-Control-Allow-Origin" : "*"}


@app.route("/reviews/<int:coaster_id>", methods=["GET"])
def get_coaster(coaster_id):
    db = RollerCoasterDB("rollercoasters_db.db")
    rollercoaster = db.getRollerCoaster(coaster_id)
    if rollercoaster:
        return rollercoaster, 200, {"Access-Control-Allow-Origin" : "*"}
    else:
        return f"review {coaster_id} Not found", 404, {"Access-Control-Allow-Origin" : "*"}


@app.route("/reviews", methods=["POST"])
def create_coaster():
    try:

        db = RollerCoasterDB("rollercoasters_db.db")
        print("the request data is: ", request.form)
        name = request.form["name"]
        review = request.form["review"]
        rating = request.form["rating"]
        date = request.form["date"]
        director = request.form["director"]
        db.createRollerCoaster(name, review, rating, date, director)
        return "Created", 201, {"Access-Control-Allow-Origin" : "*"}
    except:
        return "Bad Request", 400, {"Access-Control-Allow-Origin" : "*"}

@app.route("/reviews/<int:coaster_id>", methods=["PUT"])
def update_coaster(coaster_id):
    print("the update request data is: ", request.form)
    db = RollerCoasterDB("rollercoasters_db.db")
    rollercoaster = db.getRollerCoaster(coaster_id)
    if rollercoaster:
        name = request.form["name"]
        review = request.form["review"]
        rating = request.form["rating"]
        date = request.form["date"]
        director = request.form["director"]
        db.updateRollerCoaster(coaster_id, name, review, rating, date, director)
        return "Updated", 200, {"Access-Control-Allow-Origin" : "*"}
    else:
        return f"review {coaster_id} Not found", 404, {"Access-Control-Allow-Origin" : "*"}
    

@app.route("/reviews/<int:coaster_id>", methods=["DELETE"])
def delete_coaster(coaster_id):
    db = RollerCoasterDB("rollercoasters_db.db")
    if db.getRollerCoaster(coaster_id) is None:
        return f"review {coaster_id} Not found", 404, {"Access-Control-Allow-Origin" : "*"}
    else: 
        db.deleteRollerCoaster(coaster_id)
        return "Deleted", 200, {"Access-Control-Allow-Origin" : "*"}

def run():
    app.run(port=8080, host='0.0.0.0')

if __name__ == "__main__":
    run()