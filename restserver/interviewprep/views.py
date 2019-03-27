from django.shortcuts import render
import json
from .serializers import InterviewProfileSerializer, CourseCategorySerializer, \
    CourseSerializer, CourseIdSerializer, LessonSerializer, QuestionSerializer, \
    CourseAttemptSerializer, LessonAttemptSerializer, AttemptSerializer
from api.serializers import ProfileSerializer

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import exception_handler
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Max, Count, Sum

#model imports
from django.contrib.auth.models import User
from .models import InterviewProfile, CourseCategory, Course, Lesson, Question, Attempt, CourseAttempt, LessonAttempt
from api.models import Profile

class ListGetLessonsView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LessonSerializer

    def get_queryset(self):
       courseid = self.kwargs['courseid']
       user = self.request.user

       subscribedcourse = Course.objects.get(pk=courseid)
       ca = CourseAttempt.objects.get(
           user=self.request.user, course=subscribedcourse)
       if ca:
         return Lesson.objects.filter(courses=subscribedcourse)


class CourseView(APIView):
   permission_classes = (IsAuthenticated,)

   def get(self, request):
      courseid = self.kwargs['courseid']
      subscribedcourse = Course.objects.get(pk=courseid)
      courseattempt = CourseAttempt.objects.get(
          user=request.user, course=subscribedcourse)
      return Response({'course': CourseSerializer(subscribedcourse).data, 'attempt': CourseAttemptSerializer(courseattempt).data})


class ListGetLessonAttemptsView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LessonAttemptSerializer

    def get_queryset(self):
       courseid = self.kwargs['courseid']
       user = self.request.user

       subscribedcourse = Course.objects.get(pk=courseid)
       ca = CourseAttempt.objects.get(
           user=self.request.user, course=subscribedcourse)
       if ca:
         return LessonAttempt.objects.filter(user=self.request.user, lesson__courses__in=[subscribedcourse])


class ListGetQuestionsView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuestionSerializer

    def get_queryset(self):
       courseid = self.kwargs['courseid']
       lessonid = self.kwargs['lessonid']
       if courseid:
         subscribedcourse = Course.objects.get(pk=courseid)
         ca = CourseAttempt.objects.get(
             user=self.request.user, course=subscribedcourse)
         if ca and lessonid:
            lesson = Lesson.objects.get(pk=lessonid)
            return Question.objects.filter(lesson=lesson)

class ListGetAttemptsView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AttemptSerializer

    def get_queryset(self):
       courseid = self.kwargs['courseid']
       lessonid = self.kwargs['lessonid']
       if courseid:
         subscribedcourse = Course.objects.get(pk=courseid)
         ca = CourseAttempt.objects.get(
             user=self.request.user, course=subscribedcourse)
         if ca and lessonid:
            lesson = Lesson.objects.get(pk=lessonid)
            questions = Question.objects.filter(lesson=lesson)
            return Attempt.objects.filter(user=self.request.user, question__in=questions).annotate(bestscore=Max('score'), count=Count('id'), totalscore=Sum('score'))

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
    serializer_class = CourseAttemptSerializer
    def get_queryset(self):
       return CourseAttempt.objects.filter(user=self.request.user)


class SubscribeCourseView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            course = Course.objects.get(pk=request.data["courseid"])
            c, created = CourseAttempt.objects.get_or_create(course=course, user=request.user)
            
            return Response(CourseAttemptSerializer(c).data, status=201)
        except Exception as e:
            print(e)
            return Response(request.data, status=400)

class SubscribedCourseView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, courseid):
        try:
            course = Course.objects.get(pk=courseid)
            c = CourseAttempt.objects.get(course=course, user=request.user)
            return Response({'course': CourseSerializer(course).data, 'attempt':CourseAttemptSerializer(c).data}, status=201)
        except Exception as e:
            return Response({'error':e}, status=400)

class SubscribedLessonView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, lessonid):
        try:
            lesson = Lesson.objects.get(pk=lessonid)
            l, created = LessonAttempt.objects.get_or_create(lesson=lesson, user=request.user)
            if created:
                for c in lesson.courses.all():
                    courseattempt = CourseAttempt.objects.filter(
                        course=c, user=request.user)
                    courseattempt.lessonAttempts += 1
                    courseattempt.save()

            return Response({'lesson': LessonSerializer(lesson).data, 'attempt':LessonAttemptSerializer(l).data}, status=201)
        except Exception as e:
            print(e)
            return Response({'error':e}, status=400)

# Create your views here.
class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):

        profile = Profile.objects.get(pk=request.user.id)
        try:
            interviewprofile = InterviewProfile.objects.get(pk=request.user.id)
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
