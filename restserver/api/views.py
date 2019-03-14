from django.shortcuts import render
import json
from .serializers import CollegeSerializer
from google.oauth2 import id_token
from google.auth.transport import Request
from rest_framework import generics

#model imports
from django.contrib.auth.models import User
from .models import College

class ListCollegeView(generics.ListAPIView):
    """
    Provides a get method handler.
    """
    queryset = College.objects.all()
    serializer_class = CollegeSerializer

def googleauth(token):
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, Request(), '3440031025-0ibqq9u77l693gj0ahrf815a86kt5cts.apps.googleusercontent.com')

        # Or, if multiple clients access the backend server:
        # idinfo = id_token.verify_oauth2_token(token, requests.Request())
        # if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
        #     raise ValueError('Could not verify audience.')

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        # If auth request is from a G Suite domain:
        # if idinfo['hd'] != GSUITE_DOMAIN_NAME:
        #     raise ValueError('Wrong hosted domain.')

        # ID token is valid. Get the user's Google Account ID from the decoded token.
        userid = idinfo['sub']
        # "email": "testuser@gmail.com",
        # "email_verified": "true",
        # "name" : "Test User",
        # "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
        # "given_name": "Test",
        # "family_name": "User",
        # "locale": "en"
        #user, created = User.objects.get_or_create(username=idinfo['email'], email=idinfo['email'], first_name=idinfo['given_name'], last_name=idinfo['family_name'])
        #if created:

    except ValueError:
        # Invalid token
        pass

# Create your views here.
def authenticate(request):
    if request.method == 'POST':
        received_json_data=json.loads(request.body)
        if received_json_data.provider=='google':
            googleauth(received_json_data.idtoken)
        else:
            pass 
            # unsupported