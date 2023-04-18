#!/usr/bin/env python3

import random
from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, Astronaut
fake = Faker()

with app.app_context():

    Astronaut.query.delete()
    
    astronauts = []
    for i in range(10):
        a = Astronaut(
            name=fake.name(),
            age=random.randint(26,36),
            weight=random.randint(126, 209)
        )
        astronauts.append(a)
    
    db.session.add_all(astronauts)
    db.session.commit()


    

