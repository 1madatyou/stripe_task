FROM python:3.11-bullseye

ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y wait-for-it

WORKDIR /usr/src/backend

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . /usr/src/backend

RUN python project/manage.py collectstatic --no-input

EXPOSE 8000
