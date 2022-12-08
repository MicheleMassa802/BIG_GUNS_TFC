#!/bin/bash

# assuming python3.10 is in the standard linux path and virtualenv is installed
python3 -m virtualenv -p /usr/bin/python3.10 venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py migrate --run-syncdb

# superuser admin created with pw: password
# only run once since admin will already exist after one run
export DJANGO_SUPERUSER_PASSWORD=password
python3 manage.py createsuperuser --noinput --username admin --email nah@gmail.com

