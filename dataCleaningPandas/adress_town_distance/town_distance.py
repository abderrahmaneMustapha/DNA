import pandas as pd

data  =  pd.read_csv("AllStudent.csv")
data  =  data.filter(['N°Ins','Adresse']).drop_duplicates()
pd.DataFrame(data).to_csv('dp_adress.csv',index=False)