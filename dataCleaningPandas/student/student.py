import pandas as pd
from dateutil.parser import parse
from dateutil import tz
from dateutil.tz import gettz

data = pd.read_csv('AllStudent.csv')
data = data.filter(['N°Ins','Date_naissance','Sexe','Nationalité_Fr']).drop_duplicates(subset=['N°Ins'])
timezone_info = {    
    "CEST": gettz("UTC +2"),
    "CET":  gettz("UTC +1")   
}

data = data.rename(columns={'N°Ins': 'student_id','Date_naissance':'birthday','Sexe':'gender','Nationalité_Fr':'nationality'})
data = pd.DataFrame(data).to_csv('studentdemo.csv',index=False)
data = pd.read_csv('studentdemo.csv')
for d in range(len(data['birthday'])):       
    data['birthday'][d] = parse(data['birthday'][d], tzinfos=timezone_info).date()


data = pd.DataFrame(data).to_csv('student.csv',index=False)       
                
