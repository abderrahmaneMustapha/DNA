from django.contrib import admin
from .models import *

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

class PerformanceAdmin(admin.ModelAdmin):
    list_display = ['student','cours','cours_avg', 'date']
    list_filter = ['cours','date']

class ResultsAdmin(admin.ModelAdmin):
    list_display = ['result_id','student','date']
    list_filter = ['date']

class ScholaryearAdmin(admin.ModelAdmin):
    list_display = ['year_id','scholar_year']
  
class StudentadressAdmin(admin.ModelAdmin):
    list_display = ['adress_id','student_id','adresse']

class StudentinfoAdmin(admin.ModelAdmin):
    list_display = ['info_id','student_id','level','study_level','study_field']
    list_filter = ['study_field','repeated','statu']

class StudentsAdmin(admin.ModelAdmin):
    list_display = ['student_id','gender','nationality']
    list_filter = ['gender','nationality']

class  TownsAdmin(admin.ModelAdmin):
    list_display = ['town','dayra','wilaya','distance']
    list_filter = ['wilaya']

class  UnivfieldAdmin(admin.ModelAdmin):
    list_display = ['field_id','name']


admin.site.register( Courseprofile, CourseprofileAdmin)
admin.site.register(Univfield, UnivfieldAdmin)

admin.site.register(Courses, CoursesAdmin)
admin.site.register( Performance, PerformanceAdmin)
admin.site.register(BacPath, BacPathAdmin)

admin.site.register( Scholaryear, ScholaryearAdmin)

admin.site.register(Algoresult, AlgoresultAdmin)
admin.site.register(Bac, BacAdmin)
admin.site.register( Results, ResultsAdmin)
admin.site.register( Studentadress, StudentadressAdmin)
admin.site.register(Studentinfo, StudentinfoAdmin)
admin.site.register(Students,  StudentsAdmin)
admin.site.register(Towns, TownsAdmin)
admin.site.register(BestCourses)

