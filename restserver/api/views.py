from django.shortcuts import render
import json
from .serializers import CollegeSerializer, ProfileSerializer, StudyFieldSerializer

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import exception_handler
from rest_framework.permissions import IsAuthenticated, AllowAny

#model imports
from django.contrib.auth.models import User
from .models import College, Profile, StudyField

class ListCollegeView(generics.ListAPIView):
    """
    Provides a get method handler.
    """
    permission_classes = (IsAuthenticated,)
    queryset = College.objects.all()
    serializer_class = CollegeSerializer

class ListStudyFieldView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = StudyField.objects.all()
    serializer_class = StudyFieldSerializer

# class ProfileView(APIView):
#     permission_classes = (IsAuthenticated,)
#     def get(self, request):
#         queryset = Profile.objects.get(pk=request.user.id)
#         return Response(ProfileSerializer(queryset).data)
#     def post(self, request):
#         try:
#             profile = Profile.objects.get(pk=request.user.id)
#             profile.savedata(request.data)
#             return Response(data, status=201)
#         except:
#             return Response(data, status=400)      

# class HasProfileView(APIView):
#     permission_classes = (IsAuthenticated,)
#     def post(self, request):
#         received_json_data=json.loads(request.body)
    
#         try:
#             user = User.objects.get(username=received_json_data["username"])
#             return Response({'status':user.profile.college!=None})
#         except ObjectDoesNotExist:
#             return Response({'status':False})       

class JWTAuthentication(APIView):
    permission_classes = (AllowAny,)
    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def post(self, request):
        if request.user == None:
            return Response({"error":"Unauthorized"}, 403)
        else:
            return Response(self.get_tokens_for_user(request.user))
        # received_json_data=json.loads(request.body)
        # print(received_json_data)
        # if received_json_data.provider=='google':
        #     user = self.googleauth(received_json_data.idtoken)
        #     if(user!=None):
        #         return Response(self.get_tokens_for_user(user))
        #     else:
        #         return Response({"error":"Authentication Service not available"}, 503)
        # else:
        #     return Response({"error":"Authentication Service noo Supported"}, 401)
            # unsupported

    