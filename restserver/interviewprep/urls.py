from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('profile/', views.ProfileView.as_view(), name='fetch_profile'),
]
