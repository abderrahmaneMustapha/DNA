from rest_framework import serializers
from .models import *
class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = ('student_id' , 'birthday', 'gender', 'nationality')
        #read_only_fields  = fields

class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'
        #read_only_fields  = fields

class AlgoresultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Algoresult
        fields = '__all__'
        #read_only_fields  = fields

class BacSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Bac
        fields = '__all__'
        #read_only_fields  = fields

class BacPathSerializer(serializers.ModelSerializer):
    class Meta:
        model =  BacPath
        fields = '__all__'
        #read_only_fields  = fields

class CourseprofileSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Courseprofile
        fields = '__all__'
        #read_only_fields  = fields

class PerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Performance
        fields = '__all__'
        #read_only_fields  = fields

class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Results
        fields = '__all__'
        #read_only_fields  = fields

class ScholaryearSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Scholaryear
        fields = '__all__'
        #read_only_fields  = fields


class StudentadressSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Studentadress
        fields = '__all__'
        #read_only_fields  = fields


class StudentinfoSerializer(serializers.ModelSerializer):
    class Meta:
        model =   Studentinfo
        fields = '__all__'
        #read_only_fields  = fields

class TownsSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Towns
        fields = '__all__'
        #read_only_fields  = fields


class  UnivfieldSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Univfield
        fields = '__all__'
        #read_only_fields  = fields

class BestCoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model =  BestCourses
        fields = '__all__'
        #read_only_fields  = fields
