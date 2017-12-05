./wait-for-it.sh postgres:5432;
python setup_db.py;
gunicorn --bind 0.0.0.0:5000 main:app;
