from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('profile/', views.ProfileView.as_view(), name='fetch_profile'),
    path('courses/', views.ListCoursesView.as_view(), name='fetch_courses'),
    path('categories/', views.ListCategoriesView.as_view(), name='fetch_categories'),
    path('mycourses/', views.ListSubscribedCoursesView.as_view(), name='fetch_my_courses'),
    path('subscribecourse/', views.SubscribedCourseView.as_view(), name='subscribe_courses'),
]
