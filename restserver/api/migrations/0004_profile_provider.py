# Generated by Django 2.1.7 on 2019-03-15 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_profile_branch'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='provider',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
