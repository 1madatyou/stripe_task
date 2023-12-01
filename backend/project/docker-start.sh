#!/bin/bash
wait-for-it db:5432 -- python manage.py migrate
python manage.py loaddata ./fixture.json