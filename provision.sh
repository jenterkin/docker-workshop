#!/bin/bash

export SRC=/vagrant;

# Update system
apt-get update -y;
apt-get upgrade -y;

# Install dependencies
apt-get install -y \
    python-pip \
    libpq-dev \
    postgresql \
    postgresql-contrib;

easy_install supervisor;

pip install \
    flask \
    flask-sqlalchemy \
    gunicorn \
    psycopg2;

# Set up postgres
run_query() {
    cmd="sudo -u postgres psql -U postgres -c \"$1\"";
    if ! [ -z "$2" ]; then
        cmd="$cmd -d $2";
    fi;
    PGPASSWORD=supersecret eval $cmd;
}

sudo -u postgres psql -c \
	"ALTER USER postgres WITH ENCRYPTED PASSWORD 'supersecret'";

run_query "CREATE DATABASE crypto";
cd /vagrant/app && python -c "from main import db; db.create_all()";
run_query "INSERT INTO otherusertable VALUES (1, 'default', 0)" crypto;

# Set up Caddy
export CADDYDIR=/etc/caddy;

curl -s https://getcaddy.com | bash -s personal;
mkdir $CADDYDIR && chown -R root:www-data $CADDYDIR;
ln -s $SRC/Caddyfile $CADDYDIR/Caddyfile;
mkdir /var/www && sudo chown www-data:www-data /var/www

# Set up frontend
apt-get install -y npm;
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -;
apt-get install -y nodejs;
ln -s $(which nodejs) /usr/bin/node;
npm install -g yarn;
cd $SRC/ui;
yarn install;

sudo -u ubuntu supervisord -c /vagrant/app.conf;
