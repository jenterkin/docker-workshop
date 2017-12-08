from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:supersecret@localhost/crypto'
db = SQLAlchemy(app)


class Users(db.Model):
    __tablename__ = "otherusertable"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    balance = db.Column(db.Integer, default=0)

    def __repr__(self):
        return '<User %r>' % self.username


def get_user():
    return Users.query.all()[0]


def update_and_get_balance(func):
    user = get_user()
    user.balance = func(user.balance)
    db.session.commit()
    return user.balance


@app.route('/buy')
def buy():
    return jsonify({
        "balance": update_and_get_balance(
            lambda balance: balance + 1
        )
    })


@app.route('/sell')
def sell():
    return jsonify({
        "balance": update_and_get_balance(
            lambda balance: balance - 1
        )
    })


@app.route('/balance')
def balance():
    return jsonify({
        "balance": get_user().balance
    })


if __name__ == "__main__":
    app.run()
