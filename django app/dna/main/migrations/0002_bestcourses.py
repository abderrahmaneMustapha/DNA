# Generated by Django 3.0.1 on 2020-01-07 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BestCourses',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cours_id', models.CharField(blank=True, max_length=20, null=True)),
                ('admis_number', models.IntegerField(blank=True, null=True)),
                ('student_number', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'best_courses',
                'managed': False,
            },
        ),
    ]
