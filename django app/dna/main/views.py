from django.shortcuts import render
from .models import *
# Create your views here.
from rest_framework import permissions
from rest_framework import viewsets
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend

class StudentsView(viewsets.ModelViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class CoursesView(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class AlgoresultView(viewsets.ModelViewSet):
    queryset =  Algoresult.objects.all()
    serializer_class =  AlgoresultSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class BacView(viewsets.ModelViewSet):
    queryset =  Bac.objects.all()
    serializer_class =  BacSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class BacPathView(viewsets.ModelViewSet):
    queryset =  BacPath.objects.all()
    serializer_class =  BacPathSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class CourseprofileView(viewsets.ModelViewSet):
    queryset =  Courseprofile.objects.all()
    serializer_class =  CourseprofileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class PerformanceView(viewsets.ModelViewSet):
    queryset =  Performance.objects.all()
    serializer_class =  PerformanceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class ResultsView(viewsets.ModelViewSet):
    queryset =  Results.objects.all()
    serializer_class =  ResultsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class ScholaryearView(viewsets.ModelViewSet):
    queryset =  Scholaryear.objects.all()
    serializer_class =  ScholaryearSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class StudentadressView(viewsets.ModelViewSet):
    queryset =  Studentadress.objects.all()
    serializer_class =  StudentadressSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class StudentinfoView(viewsets.ModelViewSet):
    queryset =  Studentinfo.objects.all()
    serializer_class =  StudentinfoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class TownsView(viewsets.ModelViewSet):
    queryset =  Towns.objects.all()
    serializer_class =  TownsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

class UnivfieldView(viewsets.ModelViewSet):
    queryset =  Univfield.objects.all()
    serializer_class = UnivfieldSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'
class BestCoursesView(viewsets.ModelViewSet):
    queryset = BestCourses.objects.all()
    serializer_class = BestCoursesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'