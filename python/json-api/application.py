from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from marshmallow_jsonapi.flask import Schema
from marshmallow_jsonapi import fields

from flask_rest_jsonapi import Api, ResourceDetail, ResourceList

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///players.db'

db = SQLAlchemy(app)


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    birth_year = (db.Integer)
    team = db.Column(db.String)


db.create_all()


class PlayerSchema(Schema):
    class Meta:
        type_ = 'player'
        self_view = 'player_one'
        self_view_kwargs = {'id': '<id>'}
        self_view_many = 'player_many'

    id = fields.Integer()
    name = fields.Str(required=True)
    birth_year = fields.Integer(load_only="True")
    team = fields.Str()


class PlayerMany(ResourceList):
    schema = PlayerSchema
    data_layer = {'session': db.session, 'model': Player}


class PlayerOne(ResourceDetail):
    schema = PlayerSchema
    data_layer = {'session': db.session, 'model': Player}


api = Api(app)
api.route(PlayerMany, 'player_many', '/players')
api.route(PlayerOne, 'player_one', '/players/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)
