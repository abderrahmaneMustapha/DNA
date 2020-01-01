from django.urls import path, include
from django.contrib.auth import views as auth_views

from . import views
from rest_framework import routers
router = routers.DefaultRouter()




router.register('bac_path', views.BacPathView)
router.register('course_profile', views.CourseprofileView)
router.register('courses', views.CoursesView)
#scholar years

router.register('performance', views.PerformanceView)
#students
#scholar years
#course
router.register('towns', views.TownsView)
router.register('univ_field', views. UnivfieldView)

router.register('algore_sults', views.AlgoresultView)
router.register('bac', views.BacView)
router.register('students', views.StudentsView)
router.register('results', views.ResultsView)
router.register('scholar_years', views.ScholaryearView)
router.register('student_adress', views.StudentadressView)
router.register('student_info', views.StudentinfoView)

urlpatterns = [
    path('', include(router.urls)),
]