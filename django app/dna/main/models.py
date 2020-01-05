# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'

class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'auth_user'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey(DjangoContentType, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'



class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'





class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey(DjangoContentType, models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


   

class Scholaryear(models.Model):
    year_id = models.IntegerField(primary_key=True)
    scholar_year = models.IntegerField(blank=True, null=True)

    class Meta:
        
        db_table = 'scholaryear'
    def __str__(self):
        return self.year_id


class Univfield(models.Model):
    field_id = models.CharField(primary_key=True, max_length=3)
    name = models.CharField(max_length=36, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'univfield'
    def __str__(self):
        return str(self.name)

class Studentadress(models.Model):
    adress_id = models.IntegerField(primary_key=True)
    student_id = models.BigIntegerField()
    adresse = models.CharField(max_length=75, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'studentadress'
    def __str__(self):
        return str(self.adress_id)



class Students(models.Model):
    student_id = models.BigIntegerField(primary_key=True)
    birthday = models.DateTimeField(blank=True, null=True)
    gender = models.CharField(max_length=1, blank=True, null=True)
    nationality = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'students'
    def __str__(self):
        return str(self.student_id)


class Algoresult(models.Model):
    algo_result_id = models.IntegerField(primary_key=True)
    student_id = models.BigIntegerField(blank=True, null=True)
    algo1_exam = models.CharField(max_length=10, blank=True, null=True)
    algo1_td = models.CharField(max_length=10, blank=True, null=True)
    algo1_tp = models.CharField(max_length=10, blank=True, null=True)
    algo1_avg = models.FloatField(blank=True, null=True)
    algo2_exam = models.CharField(max_length=10, blank=True, null=True)
    algo2_td = models.CharField(max_length=10, blank=True, null=True)
    algo2_tp = models.CharField(max_length=10, blank=True, null=True)
    algo2_avg = models.FloatField(blank=True, null=True)
    scholar_year = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'algoresult'
    def __str__(self):
        return str(self.algo_result_id)


class BacPath(models.Model):
    path_id = models.AutoField(primary_key=True)
    path_name = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bac_path'
    def __str__(self):
        return  str(self.path_id)

class Bac(models.Model):
    tempd_id = models.IntegerField(primary_key=True)
    highshcool_path = models.ForeignKey(BacPath,on_delete=models.DO_NOTHING, db_column='highshcool_path', blank=True, null=True)
    bac_id = models.CharField(unique=True, max_length=11, blank=True, null=True)
    student_id = models.BigIntegerField(blank=True, null=True)
    bac_year = models.IntegerField(blank=True, null=True)
    bac_avg = models.FloatField(blank=True, null=True)
    bac_feedback = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bac'
    def __str__(self):
        return str(self.bac_id)





class Bactodb(models.Model):
    bac_to_db_id = models.IntegerField(primary_key=True)
    student_id = models.BigIntegerField(blank=True, null=True)
    gender = models.CharField(max_length=1, blank=True, null=True)
    level = models.FloatField(blank=True, null=True)
    repeated = models.CharField(max_length=5, blank=True, null=True)
    status = models.CharField(max_length=7, blank=True, null=True)
    study_path = models.CharField(max_length=10, blank=True, null=True)
    scholar_year = models.FloatField(blank=True, null=True)
    bac_id = models.CharField(max_length=10, blank=True, null=True)
    bac_year = models.CharField(max_length=10, blank=True, null=True)
    bac_path = models.CharField(max_length=10, blank=True, null=True)
    bac_feedback = models.CharField(max_length=10, blank=True, null=True)
    bac_avg = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bactodb'

class Courses(models.Model):
    cours_id = models.CharField(primary_key=True, max_length=20)
    cours_name = models.CharField(max_length=50, blank=True, null=True)
    coef = models.CharField(max_length=20, blank=True, null=True)
    level = models.CharField(max_length=20, blank=True, null=True)
    semestre = models.CharField(max_length=20, blank=True, null=True)
    study_level = models.CharField(max_length=20, blank=True, null=True)
    study_field = models.ForeignKey(Univfield, models.DO_NOTHING, db_column='study_field', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'courses'
    def __str__(self):
        return str(self.cours_id)
    


class Courseprofile(models.Model):
    course_profile_id = models.BigAutoField(primary_key=True)
    course = models.ForeignKey(Courses, models.DO_NOTHING, blank=True, null=True)
    path = models.ForeignKey(BacPath, models.DO_NOTHING, blank=True, null=True)
    date = models.ForeignKey(Scholaryear, models.DO_NOTHING, blank=True, null=True)
    m_avg = models.FloatField(blank=True, null=True)
    f_avg = models.FloatField(blank=True, null=True)
    bestm_avg = models.FloatField(blank=True, null=True)
    bestf_avg = models.FloatField(blank=True, null=True)
    admis_number = models.IntegerField(blank=True, null=True)
    student_number = models.IntegerField(blank=True, null=True)
    m_admis_number = models.IntegerField(blank=True, null=True)
    def __str__(self):
        return str(self.course_profile_id)
    class Meta:      
        db_table = 'courseprofile'
   






class Performance(models.Model):
    performance_id = models.IntegerField(primary_key=True)
    student = models.ForeignKey(Students, models.DO_NOTHING, blank=True, null=True)
    cours = models.ForeignKey(Courses, models.DO_NOTHING, blank=True, null=True)
    date = models.ForeignKey(Scholaryear, models.DO_NOTHING, blank=True, null=True)
    exam = models.FloatField(blank=True, null=True)
    td = models.FloatField(blank=True, null=True)
    tp = models.FloatField(blank=True, null=True)
    cours_avg = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'performance'
    def __str__(self):
        return str(self.performance_id) or ''
     

class Studentinfo(models.Model):
    info_id = models.BigIntegerField(primary_key=True)
    student_id = models.BigIntegerField(blank=True, null=True)
    level = models.IntegerField(blank=True, null=True)
    repeated = models.CharField(max_length=25, blank=True, null=True)
    group = models.IntegerField(blank=True, null=True)
    section = models.IntegerField(blank=True, null=True)
    study_level = models.CharField(max_length=25, blank=True, null=True)
    study_field = models.ForeignKey(Univfield, models.DO_NOTHING, db_column='study_field', blank=True, null=True)
    scholar_year = models.IntegerField(blank=True, null=True)
    orientation = models.CharField(max_length=50, blank=True, null=True)
    sem_1_avg = models.FloatField(blank=True, null=True)
    sem_2_avg = models.FloatField(blank=True, null=True)
    sem_3_avg = models.FloatField(blank=True, null=True)
    sem_4_avg = models.FloatField(blank=True, null=True)
    sem_5_avg = models.FloatField(blank=True, null=True)
    sem_6_avg = models.FloatField(blank=True, null=True)
    rechtable = models.CharField(max_length=25, blank=True, null=True)
    sem_1_credit = models.FloatField(blank=True, null=True)
    sem_2_credit = models.FloatField(blank=True, null=True)
    sem_3_credit = models.FloatField(blank=True, null=True)
    sem_4_credit = models.FloatField(blank=True, null=True)
    sem_5_credit = models.FloatField(blank=True, null=True)
    sem_6_credit = models.FloatField(blank=True, null=True)
    session2_nb = models.IntegerField(blank=True, null=True)
    debt_nb = models.IntegerField(blank=True, null=True)
    statu = models.CharField(max_length=25, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'studentinfo'
    def __str__(self):
        return str(self.info_id)



class Results(models.Model):
    result_id = models.BigAutoField(primary_key=True)
    student = models.ForeignKey(Students, models.DO_NOTHING, blank=True, null=True)
    info = models.ForeignKey(Studentinfo, models.DO_NOTHING, blank=True, null=True)
    bac = models.ForeignKey(Bac, models.DO_NOTHING, blank=True, null=True)
    date = models.ForeignKey(Scholaryear, models.DO_NOTHING, blank=True, null=True)
    algo_result = models.ForeignKey(Algoresult, models.DO_NOTHING, blank=True, null=True)
    adress = models.ForeignKey(Studentadress, models.DO_NOTHING, blank=True, null=True)
    scholar_year = models.IntegerField(blank=True, null=True)
    bac_year = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'results'
    def __str__(self):
        return str(self.result_id)





class Towns(models.Model):
    town = models.CharField(primary_key=True, max_length=25)
    dayra = models.CharField(max_length=13, blank=True, null=True)
    wilaya = models.CharField(max_length=10, blank=True, null=True)
    lat = models.FloatField(blank=True, null=True)
    long = models.FloatField(blank=True, null=True)
    distance = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'towns'
    def __str__(self):
        return str(self.town)

