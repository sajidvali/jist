from django.shortcuts import render
import json
from .serializers import InterviewProfileSerializer
from api.serializers import ProfileSerializer

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import exception_handler
from rest_framework.permissions import IsAuthenticated, AllowAny

#model imports
from django.contrib.auth.models import User
from .models import InterviewProfile
from api.models import Profile

# Create your views here.
class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        
        profile = Profile.objects.get(pk=request.user.id)
        print(ProfileSerializer(profile).data)
        try:
            interviewprofile = InterviewProfile.objects.get(pk=request.user.id)
            print(InterviewProfileSerializer(interviewprofile).data)
        except Exception as e:
            print(e)
        
        return Response({'profile':ProfileSerializer(profile).data, 'interviewprofile':InterviewProfileSerializer(interviewprofile).data})
    def post(self, request):
        try:
            profile = Profile.objects.get(pk=request.user.id)
            interviewprofile = InterviewProfile.objects.get(pk=request.user.id)
            profile.savedata(request.data["profile"])
            interviewprofile.savedata(request.data["interviewprofile"])
            return Response(request.data, status=201)
        except:
            return Response(request.data, status=400)
