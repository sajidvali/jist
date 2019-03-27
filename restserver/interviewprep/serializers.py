from rest_framework import serializers
from .models import InterviewProfile, CourseCategory, Course, Lesson, Question, Attempt, LessonAttempt, CourseAttempt

class InterviewProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewProfile
        fields = ("english_education",)

class CourseCategorySerializer(serializers.ModelSerializer):
   class Meta:
        model = CourseCategory
        fields = ("id", "title")

class CourseSerializer(serializers.ModelSerializer):
   category = serializers.SlugRelatedField(
        slug_field="title", queryset=CourseCategory.objects.all(),
    )
   class Meta:
        model = Course
        fields = ("id", "title","description", "image", "category", "lessoncount")

class CourseIdSerializer(serializers.ModelSerializer):
   class Meta:
        model = Course
        fields = ("id",)

class LessonSerializer(serializers.ModelSerializer):
   class Meta:
        model = Lesson
        fields = ("id", "title", "description", "image", "questionCount", "attempts", "completed")

class QuestionSerializer(serializers.ModelSerializer):
   class Meta:
        model = Question
        fields = '__all__'

class LessonAttemptSerializer(serializers.ModelSerializer):
   class Meta:
        model = LessonAttempt
        fields = ("lesson", "score", "starttime", "lasttime", "questions", "attempts")

class CourseAttemptSerializer(serializers.ModelSerializer):
   class Meta:
        model = CourseAttempt
        fields = ("course", "lessonsCompleted", "lessonAttempts", "score", "starttime")


class AttemptSerializer(serializers.Serializer):
   question = serializers.IntegerField()
   count = serializers.IntegerField()
   bestscore = serializers.IntegerField()
   totalscore = serializers.IntegerField()

