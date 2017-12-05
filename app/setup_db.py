from main import db, Users


if __name__ == "__main__":
    db.create_all()
    users = Users.query.all()
    if len(users) == 0:
        user = Users(username="default", balance=0)
        db.session.add(user)
        db.session.commit()
