from django.contrib import admin
from .models import (Courses,Courseprofile,Bactodb,Bac,BacPath,Algoresult,Performance,
Results,Scholaryear,Students,Studentadress,Studentinfo,Towns,Univfield)

class CoursesAdmin(admin.ModelAdmin):
    list_display = ('cours_id','level','semestre')
    list_filter = ['level','semestre','study_level','study_field']


class AlgoresultAdmin(admin.ModelAdmin):
    list_display = ['algo_result_id','student_id']
    list_filter = ['scholar_year',]

class BacAdmin(admin.ModelAdmin):
    list_display = ['bac_id','student_id','bac_avg','bac_year']
    list_filter = ['highshcool_path','bac_feedback']

class BacPathAdmin(admin.ModelAdmin):
    list_display = ['path_id','path_name']

class CourseprofileAdmin(admin.ModelAdmin):
    list_display = ['course_profile_id','course']
    list_filter = ['path','date']


admin.site.register(Courses, CoursesAdmin)
admin.site.register(Algoresult, AlgoresultAdmin)
admin.site.register(Bac, BacAdmin)
admin.site.register(BacPath, BacPathAdmin)
admin.site.register( Courseprofile, CourseprofileAdmin)
