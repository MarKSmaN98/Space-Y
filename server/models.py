from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

# Models go here!

class Astronaut(db.Model, SerializerMixin):
    __tablename__ = 'astronauts'

    id = db.Column(db.Integer, primary_key=True)
    #name, age, weight
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    spaceships = association_proxy('missions', 'spaceship')
    missions = db.relationship('Mission', backref='astronaut')

class Spaceship(db.Model, SerializerMixin):
    __tablename__ = 'spaceships'

    id = db.Column(db.Integer, primary_key=True)
    #name
    name = db.Column(db.String)
    astronauts = association_proxy('missions', 'astronaut')
    missions = db.relationship('Mission', backref='spaceship')

class Mission(db.Model, SerializerMixin):
    __tablename__ = 'missions'
    #astronaut_id, spaceship_id

    serialize_rules = ('astronaut', 'spaceship')

    id = db.Column(db.Integer, primary_key=True)
    astronaut_id = db.Column(db.Integer, db.ForeignKey('astronauts.id'))
    spaceship_id = db.Column(db.Integer, db.ForeignKey('spaceships.id'))

#login class? store cookies here and have two tiers of user, an astronaut and an admin with different privilages:
#an astronaut should be able to view missions, space ships, and other astronauts
#an admin/commander should be able to preform crud actions on all of the above