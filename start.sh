gunicorn --daemon --bind 127.0.0.1:5000 app.main:app;
cd ui;
caddy&
yarn start;
