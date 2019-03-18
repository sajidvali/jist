from rest_framework import serializers
from .models import InterviewProfile

class InterviewProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewProfile
        fields = ("english_education",)

