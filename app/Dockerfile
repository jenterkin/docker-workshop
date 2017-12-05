FROM python:3.6

RUN pip install \
    flask \
    flask-sqlalchemy \
    gunicorn \
    psycopg2

ENV SRC=/src
ENV FILE=main.py
ENV FLASK_APP=$SRC/$FILE
WORKDIR $SRC

COPY . $SRC
CMD ./start.sh
