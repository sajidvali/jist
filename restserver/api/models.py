from django.db import models
import datetime

# Create your models here.
from django.contrib.auth.models import User

class College(models.Model):
    name = models.CharField(max_length=100, unique=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    college = models.OneToOneField(College, on_delete=models.SET_NULL, null=True)
    BRANCH_CHOICES = (
        ('CSE', 'Computer Science and Engineering'),
        ('ECE', 'Electronics and Communication Engineering'),
        ('IT', 'Information Technology'),
        ('MECH', 'Mechanical Engineering'),
        ('CE', 'Civil Engineering'),
        ('EEE', 'Electrical and Electronics Engineering'),
    )
    branch = models.CharField(max_length=4, choices = BRANCH_CHOICES, null=True)
    GENDER_CHOICES = (('M', "Male"), ('F', "Female"))
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True)
    YEAR_CHOICES = []
    for r in range((datetime.datetime.now().year), (datetime.datetime.now().year+5)):
        YEAR_CHOICES.append((r,r))

    graduationyear = models.IntegerField(choices=YEAR_CHOICES, default=datetime.datetime.now().year)

    ENGLISH_EDU_CHOICES = (('N', "Non English Medium"), ("E", "English Medium"), ('P',"Mixed English and Local"))
    english_education = models.CharField(max_length=1, choices=ENGLISH_EDU_CHOICES, default='N')

