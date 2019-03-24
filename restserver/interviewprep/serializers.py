from rest_framework import serializers
from .models import InterviewProfile, CourseCategory, Course, Lesson, Question, Attempt

class InterviewProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewProfile
        fields = ("english_education",)

class CourseCategorySerializer(serializers.ModelSerializer):
   class Meta:
        model = CourseCategory
        fields = ("id", "title")

class CourseSerializer(serializers.ModelSerializer):
   class Meta:
        model = Course
        fields = ("id", "title","description","canpeek", "cost", "image", "category")

class CourseIdSerializer(serializers.ModelSerializer):
   class Meta:
        model = Course
        fields = ("id",)

class LessonSerializer(serializers.ModelSerializer):
   class Meta:
        model = Lesson
        fields = ("id", "title", "description", "paid", "image")

class QuestionSerializer(serializers.ModelSerializer):
   class Meta:
        model = Question
        fields = ("id", "title", "question", "speechtext", "visemes", "answer", "score")
