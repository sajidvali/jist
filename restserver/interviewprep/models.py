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


class Course(models.Model):
   title = models.CharField(max_length=50)
   description = models.CharField(max_length=1000)
   users = models.ManyToManyField(User)
   canpeek = models.BooleanField(default=True)
   cost = models.FloatField(default=0)

   def __str__(self):
        return self.title

   class Meta:
        ordering = ('title',)


class Lesson(models.Model):
   title = models.CharField(max_length=50)
   description = models.CharField(max_length=1000)
   course = models.ForeignKey(Course, on_delete=models.CASCADE)
   paid = models.BooleanField(default=False)

   def __str__(self):
        return self.title

   class Meta:
        ordering = ('title',)


class Question(models.Model):
   title = models.CharField(max_length=50)
   question = models.CharField(max_length=500)
   visemes = models.CharField(max_length=500)
   answer = models.CharField(max_length=1000)
   lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
   score = models.IntegerField(default=100)

   def __str__(self):
        return self.title

   class Meta:
        ordering = ('title',)

class Attempt(models.Model):
   question = models.ForeignKey(Question, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   score = models.FloatField(default=0)
   answer = models.CharField(max_length=2000)