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
                'id': a.id,
                'name': a.name,
                'age': a.age,
                'weight': a.weight
            }
            a_list.append(a_dict)

        response = make_response(a_list, 200)

        return response
    
    def post(self):

        try:
            new = Astronaut(
            name = request.get_json()['name'],
            age = request.get_json()['age'],
            weight = request.get_json()['weight']
        )
            db.session.add(new)
            db.session.commit()

            response = make_response(new.to_dict(), 201)

        except ValueError:
            db.session.rollback()
            response = make_response({'error': 'validation errors'}, 422)

        return response

api.add_resource(Astronauts, '/astronauts')


class AstronautByID (Resource):
    
    def get(self, id):

        astronaut = Astronaut.query.filter_by(id=id).first()

        if astronaut == None:

            response = make_response({'error': 'Astronaut not found'}, 404)

        else:
            
            astronaut_dict = astronaut.to_dict()

            response = make_response(astronaut_dict, 200)

        return response


    def patch(self, id):
        
        data = request.get_json()
        
        astronaut = Astronaut.query.filter_by(id=id).first()

            
        for attr in data:
                
            setattr(astronaut, attr, data[attr])

        db.session.add(astronaut)
        db.session.commit()

        astronaut_dict = astronaut.to_dict()

        response = make_response(astronaut_dict, 200)

        return response


    def delete(self,id):
        
        astronaut = Astronaut.query.filter_by(id=id).first()

        if astronaut == None:

            response = make_response({'error': 'Astronaut not found'}, 404)

        else:
            
            db.session.delete(astronaut)
            db.session.commit()

            response = make_response({}, 204)

        return response



api.add_resource(AstronautByID, '/astronauts/<int:id>')

class Spaceships (Resource):
    def get(self):
        ships = []
        for ship in Spaceship.query.all():
            new_ship={
                'id': ship.id,
                'name': ship.name,
                'image': ship.image
            }
            ships.append(new_ship)
        response = make_response(ships, 200)

        return response

    def post(self):
        new_ship = Spaceship(
            name = request.get_json()['name'], image=request.get_json()['image']
        )
        db.session.add(new_ship)
        db.session.commit()
        resp = make_response (new_ship.to_dict(), 201)
        return resp

api.add_resource(Spaceships, '/spaceships')

class SpaceshipById (Resource):
    def get(self, id):
        target = Spaceship.query.filter(Spaceship.id == id).first()
        body = {
            'name': target.name,
            'image': target.image
        }
        resp = make_response(
            body,
            200
        )
        return resp
    
    def patch(self, id):
        data = request.get_json()
        target = Spaceship.query.filter(Spaceship.id == id).first()
        for attr in data:
            setattr(target, attr, data[attr])
        db.session.add(target)
        db.session.commit()
        body = {
            'name': target.name
        }
        resp = make_response(
            body,
            200
        )
        return resp
api.add_resource(SpaceshipById, '/spaceships/<int:id>')

class Missions(Resource):
    def get(self):
        missions = []
        for mission in Mission.query.all():
            this_mission = {
                'mission id': mission.id,
                'astronaut': {
                    'astronaut id': mission.astronaut.id,
                    'name': mission.astronaut.name
                },
                'spaceship': {
                    'spaceship id': mission.spaceship.id,
                    'name': mission.spaceship.name
                }
            }
            missions.append(this_mission)
        resp = make_response(
            missions,
            200
        )
        return resp
    
    def post(self):
        new_mission = Mission(
            astronaut_id = request.get_json()['astronaut_id'],
            spaceship_id = request.get_json()['spaceship_id']
        )
        db.session.add(new_mission)
        db.session.commit()
        this_mission = {
            'mission id': new_mission.id,
            'astronaut': {
                'astronaut id': new_mission.astronaut.id,
                'name': new_mission.astronaut.name
            },
            'spaceship': {
                'spaceship id': new_mission.spaceship.id,
                'name': new_mission.spaceship.name
            }
        }
        body = this_mission
        resp = make_response(body, 201)
        return resp
    
api.add_resource(Missions, '/missions')

class MissionByID(Resource):
    def get(self, id):
        target_mission = Mission.query.filter(Mission.id == id).first()
        this_mission = {
            'mission id': target_mission.id,
            'astronaut': {
                'astronaut id': target_mission.astronaut.id,
                'name': target_mission.astronaut.name
            },
            'spaceship': {
                'spaceship id': target_mission.spaceship.id,
                'name': target_mission.spaceship.name
            }
        }
        resp = make_response(this_mission, 200)
        return resp
    
    def patch(self, id):
        mission = Mission.query.filter(Mission.id == id).first()
        data = request.get_json()

        for attr in data:
            setattr(mission, attr, data[attr])
        db.session.add(mission)
        db.session.commit()
        resp = make_response(mission.to_dict(), 200)
        return resp
api.add_resource(MissionByID, '/missions/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
