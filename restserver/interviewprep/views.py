from django.shortcuts import render
import json
from .serializers import InterviewProfileSerializer, CourseCategorySerializer, CourseSerializer, CourseIdSerializer, LessonSerializer, QuestionSerializer
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
from .models import InterviewProfile, CourseCategory, Course, Lesson, Question, Attempt
from api.models import Profile


class ListCoursesView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class ListCategoriesView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer


class ListSubscribedCoursesView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CourseIdSerializer

    def get_queryset(self):
       print(self.request.user)
       print(self.request.user.course_set.all())
       return self.request.user.course_set.all()


class SubscribedCourseView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            course = Course.objects.get(pk=request.data["courseid"])
            print(course)
            print(course.users.all())
            print(request.user)
            course.users.add(request.user)
            print(course.users.all())
            return Response(request.data, status=201)
        except:
            return Response(request.data, status=400)


# Create your views here.
class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):

        profile = Course.objects.get(pk=request.user.id)
        print(ProfileSerializer(profile).data)
        try:
            interviewprofile = InterviewProfile.objects.get(pk=request.user.id)
            print(InterviewProfileSerializer(interviewprofile).data)
        except Exception as e:
            print(e)

        return Response({'profile': ProfileSerializer(profile).data, 'interviewprofile': InterviewProfileSerializer(interviewprofile).data})

    def post(self, request):
        try:
            profile = Profile.objects.get(pk=request.user.id)
            interviewprofile = InterviewProfile.objects.get(pk=request.user.id)
            profile.savedata(request.data["profile"])
            interviewprofile.savedata(request.data["interviewprofile"])
            return Response(request.data, status=201)
        except:
            return Response(request.data, status=400)
