import pandas as pd


data  = pd.read_csv("Filieres.csv")

#get code and specialite column and drop first row
data = data.filter(['code_filière','Spécialité'])
data = data.drop(data.index[0])

data = data.rename(columns={"code_filière": "field_id", "Spécialité": "name"})

#replace éè with e  and get field id from code_filiere text
data['name'] = data['name'].replace(regex=True, to_replace=r'é|è', value=r'e').str.lower()
data['field_id']  = data['field_id'].str[-2:]
data = data.filter(['field_id','name']).drop_duplicates()

pd.DataFrame(data).to_csv('univ_field.csv',index=False)
