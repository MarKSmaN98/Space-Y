#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Spaceship, Astronaut, Mission

# Views go here!

class Astronauts (Resource):

    def get(self):
        
        a_list = []
        for a in Astronaut.query.all():
            a_dict = {
                'name': a.name,
                'age': a.age,
                'weight': a.weight
            }
            a_list.append(a_dict)

        response = make_response(a_list, 200)

        return response

api.add_resource(Astronauts, '/astronauts')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
