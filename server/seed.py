#!/usr/bin/env python3

import random
from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, Astronaut, Spaceship, Mission
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

    Spaceship.query.delete()
    db.session.commit()

    spaceship1 = Spaceship(
        id=1,
        name='Anaconda',
        image="./images/anaconda.jpeg"
    )

    spaceship2 = Spaceship(
        id=2,
        name='Type 10',
        image='https://physicsworld.com/wp-content/uploads/2020/10/PortClimb.jpg'
    )

    spaceship3 = Spaceship(
        id=3,
        name='Krait Mk II',
        image='https://pbs.twimg.com/media/Dg13_dtW0AAW8Vl.jpg:large'
    )

    spaceship4 = Spaceship(
        id=4,
        name='Rainbow 5',
        image='https://mahoutofu.files.wordpress.com/2015/04/fxchzxj.png'
    )

    db.session.add_all([spaceship1, spaceship2, spaceship3, spaceship4])
    db.session.commit()

    Mission.query.delete()
    db.session.commit()

    m1 = Mission(
        astronaut_id=1,
        spaceship_id='2',
    )

    m2 = Mission(
        astronaut_id=2,
        spaceship_id='3',
    )

    m3 = Mission(
        astronaut_id=4,
        spaceship_id='2',
    )

    m4 = Mission(
        astronaut_id=7,
        spaceship_id='3',
    )

    db.session.add_all([m1, m2, m3, m4])
    db.session.commit()






    

