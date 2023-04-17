from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

# Models go here!

class Astronaut(db.Model, SerializerMixin):
    pass

class Spaceship(db.Model, SerializerMixin):
    pass

class Mission(db.Model, SerializerMixin):
    pass
