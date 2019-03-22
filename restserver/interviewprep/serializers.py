from rest_framework import serializers
from .models import InterviewProfile, CourseCategory, Course, Lesson, Question, Attempt

class InterviewProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewProfile
        fields = ("english_education",)

class CourseCategorySerializer(serializers.ModelSerializer):
   class Meta:
        model = CourseCategory
        fields = ("title",)

class CourseSerializer(serializers.ModelSerializer):
   class Meta:
        model = Course
        fields = ("title","description","canpeek", "cost")

class LessonSerializer(serializers.ModelSerializer):
   class Meta:
        model = Lesson
        fields = ("title","description","paid")

class QuestionSerializer(serializers.ModelSerializer):
   class Meta:
        model = Question
        fields = ("title","question", "speechtext","visemes","answer","score")
