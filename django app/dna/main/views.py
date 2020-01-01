from django.shortcuts import render

# Create your views here.
from rest_framework import permissions
from rest_framework import viewsets
from .serializers import *

class StudentsView(viewsets.ModelViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializer


class CoursesView(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer


class AlgoresultView(viewsets.ModelViewSet):
    queryset =  Algoresult.objects.all()
    serializer_class =  AlgoresultSerializer


class BacView(viewsets.ModelViewSet):
    queryset =  Bac.objects.all()
    serializer_class =  BacSerializer

class BacPathView(viewsets.ModelViewSet):
    queryset =  BacPath.objects.all()
    serializer_class =  BacPathSerializer

class CourseprofileView(viewsets.ModelViewSet):
    queryset =  Courseprofile.objects.all()
    serializer_class =  CourseprofileSerializer

class PerformanceView(viewsets.ModelViewSet):
    queryset =  Performance.objects.all()
    serializer_class =  PerformanceSerializer

class ResultsView(viewsets.ModelViewSet):
    queryset =  Results.objects.all()
    serializer_class =  ResultsSerializer

class ScholaryearView(viewsets.ModelViewSet):
    queryset =  Scholaryear.objects.all()
    serializer_class =  ScholaryearSerializer

class StudentadressView(viewsets.ModelViewSet):
    queryset =  Studentadress.objects.all()
    serializer_class =  StudentadressSerializer

class StudentinfoView(viewsets.ModelViewSet):
    queryset =  Studentinfo.objects.all()
    serializer_class =  StudentinfoSerializer

class TownsView(viewsets.ModelViewSet):
    queryset =  Towns.objects.all()
    serializer_class =  TownsSerializer

class UnivfieldView(viewsets.ModelViewSet):
    queryset =  Univfield.objects.all()
    serializer_class = UnivfieldSerializer