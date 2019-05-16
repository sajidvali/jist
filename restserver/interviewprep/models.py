from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save, post_delete, m2m_changed, pre_delete
from interviewprep import source
from datetime import datetime
from django.db.models import Max

# Create your models here.


class InterviewProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    ENGLISH_EDU_CHOICES = (('N', "Non English Medium"),
                           ("E", "English Medium"), ('P', "Mixed English and Local"))
    english_education = models.CharField(
        max_length=1, choices=ENGLISH_EDU_CHOICES, default='N')
    score = models.IntegerField(default=0)
    attempts = models.IntegerField(default=0)
    questions = models.IntegerField(default=0)
    lastaction = models.DateTimeField(auto_now_add=True)

    def savedata(self, data):
        self.english_education = data["english_education"]
        self.save()


@receiver(post_save, sender=User)
def create_user_interview_profile(sender, instance, created, **kwargs):
    if created:
        InterviewProfile.objects.create(user=instance)


class CourseCategory(models.Model):
   title = models.CharField(max_length=50)

   def __str__(self):
        return self.title

   class Meta:
        ordering = ('title',)


class Course(models.Model):
   title = models.CharField(max_length=50)
   description = models.CharField(max_length=1000)
   image = models.URLField(max_length=200, blank=True)
   lessoncount = models.IntegerField(default=0)
   category = models.ForeignKey(
       CourseCategory, on_delete=models.DO_NOTHING, blank=True)

   def __str__(self):
        return self.title

   class Meta:
        ordering = ('title',)


class CourseAttempt(models.Model):
   course = models.ForeignKey(Course, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   starttime = models.DateTimeField(auto_now_add=True)
   lessonsCompleted = models.IntegerField(default=0)
   lessonAttempts = models.IntegerField(default=0)
   score = models.IntegerField(default=0)


class Lesson(models.Model):
   title = models.CharField(max_length=50)
   description = models.CharField(max_length=1000)
   courses = models.ManyToManyField(Course, blank=True)
   image = models.URLField(max_length=200, blank=True)
   questionCount = models.IntegerField(default=0)
   attempts = models.IntegerField(default=0)
   completed = models.IntegerField(default=0)

   def __str__(self):
        return self.title

   class Meta:
        ordering = ('title',)

@receiver(pre_delete, sender=Lesson)
def delete_lesson(sender, instance, **kwargs):
   for course in instance.courses.all():
      course.lessoncount -= 1
      course.save()
      refreshCourseAttemptsForCourse(course)
      #TODO: Check if this actually works, else you may have to have event on LessonAttempt deleted

# ideally this should be a rare instance, but this is going to take a while if there are too many attempts
# but this is importnat to maintain sanity
def courses_changed(sender, instance, action, reverse, model, pk_set, **kwargs):
    # There are four possibilities
    if not reverse:
       # we added or removed courses from lesson, instance is the lesson
       lesson = instance
       for course in Course.objects.filter(pk__in=pk_set):
          if action=="post_add":
             course.lessoncount += 1
          elif action=="post_remove":
             course.lessoncount -= 1
          course.save()
          refreshCourseAttemptsForCourse(course)
    else:
       # we added or removed lessons from course, instance is the course
       course = instance
       if action=="post_add":
         course.lessoncount += len(pk_set)
       elif action=="post_remove":
         course.lessoncount -= len(pk_set)
       course.save()
       refreshCourseAttemptsForCourse(course)

m2m_changed.connect(courses_changed, sender=Lesson.courses.through)

def refreshCourseAttemptsForCourse(course):
   c = CourseAttempt.objects.filter(course=course)
   for courseattempt in c:
      courseattempt.lessonAttempts = 0
      courseattempt.lessonsCompleted = 0
      courseattempt.score = 0
      for lesson in courseattempt.course.lesson_set.all():
         lessonattempt = LessonAttempt.objects.filter(lesson=lesson, user=courseattempt.user)
         if lessonattempt.count() > 0:
            if lessonattempt[0].questions > 0:
               courseattempt.lessonAttempts += 1
            if lessonattempt[0].questions == lesson.questionCount:
               courseattempt.lessonsCompleted += 1
            courseattempt.score += lessonattempt[0].score
      courseattempt.save()

class LessonAttempt(models.Model):
   lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   score = models.FloatField(default=0)
   starttime = models.DateTimeField(auto_now_add=True)
   lasttime = models.DateTimeField(auto_now_add=True)
   questions = models.IntegerField(default=0)
   attempts = models.IntegerField(default=0)
   score = models.IntegerField(default=0)


class Question(models.Model):
   title = models.CharField(max_length=50)
   question = models.CharField(max_length=500)
   speechtext = models.CharField(max_length=500, blank=True)
   visemes = models.CharField(max_length=500, blank=True)
   answer = models.CharField(max_length=1000)
   lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
   score = models.IntegerField(default=100)
   attempts = models.IntegerField(default=0)
   totalscore = models.IntegerField(default=0)
   accuracy = models.FloatField(default=0)

   def __str__(self):
        return self.title

   class Meta:
        ordering = ('title',)

# generate visemes and speech text before saving question


def QuestionHandler(sender, instance, **kwargs):
   instance.speechtext = source.generateSpeechText(instance.question)
   instance.visemes = source.generateVisemes(instance.speechtext)


#connect the handler with pre-save event
pre_save.connect(QuestionHandler, sender=Question)

# upon save update lesson
@receiver(post_save, sender=Question)
def create_question(sender, instance, created, **kwargs):
    if created:
        # some lesson attempts may now not be complete
        lessonattempts = LessonAttempt.objects.filter(lesson=instance.lesson)
        for lessonattempt in lessonattempts:
            if instance.lesson.questionCount == lessonattempt.questions:
               updateCourseAttempts(lessonattempt, -1, 0)

        instance.lesson.questionCount += 1
        instance.lesson.save()
        

#upon delete update lesson
@receiver(post_delete, sender=Question)
def delete_question(sender, instance, **kwargs):
   if instance.lesson.questionCount > 0:
      instance.lesson.questionCount -= 1
      instance.lesson.save()

   # update all lesson attempt stats since questions have decreased
   lessonattempts = LessonAttempt.objects.filter(lesson=instance.lesson)
   for lessonattempt in lessonattempts:
      (attemptcount, bestscore) = getBestScore(instance, lessonattempt.user)
      lessonattempt.questions -= (attemptcount > 0)
      lessonattempt.score -= bestscore
      lessonattempt.save()

      updateCourseAttempts(lessonattempt,
                           1 if lessonattempt.questions == lessonattempt.lesson.questionCount else 0,
                           -bestscore)
      # set course dirty bit


class Attempt(models.Model):
   question = models.ForeignKey(Question, on_delete=models.CASCADE)
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   score = models.FloatField(default=0)
   answer = models.CharField(max_length=2000)
   timestamp = models.DateTimeField(auto_now_add=True)


def getBestScore(question, user):
   attempts = Attempt.objects.filter(question=question, user=user)

   attemptcount = attempts.count() if attempts else 0
   score = attempts.aggregate(Max('score'))[
       0].score__max if attemptcount > 0 else 0

   return (attemptcount, score)


def updateCourseAttempts(lessonattempt, lessoncompleted, scorechange):
   if lessoncompleted or scorechange:
       for c in lessonattempt.lesson.courses.all():
         courseattempt = CourseAttempt.objects.filter(
             course=c, user=lessonattempt.user)
         courseattempt.lessonsCompleted += lessoncompleted
         courseattempt.score += scorechange
         courseattempt.save()


@receiver(post_save, sender=Attempt)
def process_attempt(sender, instance, created, **kwargs):
    if created:
        # increment question attempt count
        instance.question.attempts += 1
        instance.question.totalscore += instance.score
        instance.question.accuracy = instance.question.totalscore/(instance.question.score*instance.question.attempts)
        lessonstarted = lessoncompleted = False
        # get all attempts user has made for this question
        (attemptcount, bestscore) = getBestScore(
            instance.question, instance.user)
        firstattempt = (attemptcount == 1)

        # get interview profile of the user
        profile = InterviewProfile.objects.get(user=instance.user)

        # increment user attempt count
        profile.attempts += 1
        profile.lastaction = datetime.now

        # get lesson attempt or create one
        lessonattempt = LessonAttempt.objects.get(
            lesson=instance.question.lesson, user=instance.user)

        # update time and attempts inside that lesson
        lessonattempt.lasttime = datetime.now
        lessonattempt.attempts += 1

        # if a fresh lesson attempt started
        # TODO: double check
        #lessonattempt.lesson.attemptCount += 1 if firstattempt else 0

        # check if this was first attempt of this question by this user
        if firstattempt:
            # user attempted one more question
            profile.questions += 1        # update profile
            lessonattempt.questions += 1  # update lessonattempt
            lessoncompleted = (lessonattempt.questions ==
                               lessonattempt.lesson.questionCount)

        # find the last best score excuting this instance.
        # if the current score is greatet than previous best add difference to our analytics
        #TODO: below logic is incorrect. Because bestscore is the max including current inatance
        change = bestscore if instance.score > bestscore else instance.score
        scorechange = instance.score - change

        lessonattempt.score += scorechange
        profile.score += scorechange
        # TODO: update above

        updateCourseAttempts(lessonattempt,
                             lessoncompleted, scorechange)

        # check if all questions in lesson are attempted by this user
        # save user profile
        lessonattempt.save()
        profile.save()
        instance.question.save()
        lessonattempt.lesson.save()
