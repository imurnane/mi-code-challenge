"""Simulations
Author: Ian Murnane
Date: 2nd Mar 2021
Email: imurnane@internode.on.net
"""

from api.simulations import Simulations
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
cors = CORS()

# instantiate the app
app = Flask(__name__)
cors.init_app(app)
api = Api(app)

api.add_resource(Simulations, "/simulations")
