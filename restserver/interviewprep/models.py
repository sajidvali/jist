from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.
class InterviewProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    ENGLISH_EDU_CHOICES = (('N', "Non English Medium"), ("E", "English Medium"), ('P',"Mixed English and Local"))
    english_education = models.CharField(max_length=1, choices=ENGLISH_EDU_CHOICES, default='N')

    def savedata(self, data):
        self.english_education = data["english_education"]
        self.save()

@receiver(post_save, sender=User)
def create_user_interview_profile(sender, instance, created, **kwargs):
    if created:
        InterviewProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_interview_profile(sender, instance, **kwargs):
    instance.profile.save()