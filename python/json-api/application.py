from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from marshmallow_jsonapi.flask import Schema, Relationship
from marshmallow_jsonapi import fields

from flask_rest_jsonapi import Api, ResourceDetail, ResourceList, \
    ResourceRelationship

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///players.db'

db = SQLAlchemy(app)


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    birth_year = (db.Integer)
    team = db.Column(db.String)


class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'))
    player = db.relationship('Player', backref=db.backref('roles'))


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
    roles = Relationship(self_view='player_roles',
                         self_view_kwargs={'id': '<id>'},
                         related_view='role_many',
                         many=True,
                         schema='RoleSchema', type_='role')


class RoleSchema(Schema):
    class Meta:
        type_ = 'role'
        self_view = 'role_one'
        self_view_kwargs = {'id': '<id>'}
        self_view_many = 'role_many'

    id = fields.Integer()
    name = fields.Str(required=True)
    player_id = fields.Integer(required=True)


class PlayerMany(ResourceList):
    schema = PlayerSchema
    data_layer = {'session': db.session, 'model': Player}


class PlayerOne(ResourceDetail):
    schema = PlayerSchema
    data_layer = {'session': db.session, 'model': Player}


class RoleMany(ResourceList):
    schema = RoleSchema
    data_layer = {'session': db.session, 'model': Role}


class RoleOne(ResourceDetail):
    schema = RoleSchema
    data_layer = {'session': db.session, 'model': Role}


class PlayerRole(ResourceRelationship):
    schema = PlayerSchema
    daata_layer = {'session': db.session, 'model': Player}


api = Api(app)
api.route(PlayerMany, 'player_many', '/players')
api.route(PlayerOne, 'player_one', '/players/<int:id>')
api.route(RoleOne, 'role_one', '/roles/<int:id>')
api.route(RoleMany, 'role_many', '/roles')
api.route(PlayerRole, 'player_roles',
          '/players/<int:id>/relationships/roles')

if __name__ == '__main__':
    app.run(debug=True)
