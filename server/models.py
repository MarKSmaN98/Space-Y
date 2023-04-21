from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

# Models go here!

class Astronaut(db.Model, SerializerMixin):
    __tablename__ = 'astronauts'

    serialize_rules = ('-missions.astronaut','spaceships', '-missions.spaceship')
     

    id = db.Column(db.Integer, primary_key=True)
    #name, age, weight
    name = db.Column(db.String)
    age = db.Column(db.Integer, db.CheckConstraint('age == int(age)'))
    weight = db.Column(db.Integer)

    spaceships = association_proxy('missions', 'spaceship')
    missions = db.relationship('Mission', backref='astronaut', cascade='all, delete-orphan')

    __table_args__ = (db.CheckConstraint('age == int(age)'),)

    @validates('weight') 
    def weight_validation(self, key, weight):
        if not 110 < int(weight) < 209:
            raise ValueError('weight must be above 110 and less than 209')
        return weight

    @validates('age')
    def age_validation(self, key, age_input):
        ageval = int(age_input)
        if type((ageval)) != int:
            raise ValueError('age must be an integer')
        return age_input


class Spaceship(db.Model, SerializerMixin):
    __tablename__ = 'spaceships'

    serialize_rules = ('-missions',)

    id = db.Column(db.Integer, primary_key=True)
    #name
    name = db.Column(db.String)
    image = db.Column(db.String)

    astronauts = association_proxy('missions', 'astronaut')
    missions = db.relationship('Mission', backref='spaceship')

class Mission(db.Model, SerializerMixin):
    __tablename__ = 'missions'
    #astronaut_id, spaceship_id

    serialize_rules = ('astronaut', 'spaceship')

    id = db.Column(db.Integer, primary_key=True)
    astronaut_id = db.Column(db.Integer, db.ForeignKey('astronauts.id'))
    spaceship_id = db.Column(db.Integer, db.ForeignKey('spaceships.id'))
    # missions backref = spaceship --- to remove -missions.spaceship
    # missions backref = astronaut --- to remove -missions.astronaut

#login class? store cookies here and have two tiers of user, an astronaut and an admin with different privilages:
#an astronaut should be able to view missions, space ships, and other astronauts
#an admin/commander should be able to preform crud actions on all of the above