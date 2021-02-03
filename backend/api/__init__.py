import os
from os import path
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
cors = CORS()

# instantiate the app
app = Flask(__name__)
cors.init_app(app)
api = Api(app)

# set config
app_settings = os.getenv("APP_SETTINGS")
app.config.from_object(app_settings)


class SimulationsPing(Resource):
    def get(self):
        return {"status": "success", "message": "pong!"}


api.add_resource(SimulationsPing, "/simulations/ping")