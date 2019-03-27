from django.contrib import admin

# Register your models here.
from .models import InterviewProfile, Course, Lesson, Question, Attempt, CourseCategory, CourseAttempt, LessonAttempt

admin.site.register(InterviewProfile)
admin.site.register(Course)
admin.site.register(CourseCategory)
admin.site.register(Lesson)
admin.site.register(Question)
admin.site.register(Attempt)
admin.site.register(CourseAttempt)
admin.site.register(LessonAttempt)
