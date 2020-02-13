import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

algo =  pd.read_csv("result_clean.csv")
algo.info()

bac =  pd.read_csv("student_bac_path.csv")
bac = bac.rename(columns={"student_id": "id_student"})

merge = bac.merge(algo, how='inner')

merge = merge.drop(columns=['id_student','level','repeated', 'repeated', 'scholar_year', 'bac_id','current_year','study_path','study_level','status'])

Y = merge['algo_two']
X = merge.drop(columns=['algo_two'])

#encode data 
from sklearn.preprocessing import LabelEncoder
label = LabelEncoder()
for i in range(0,X.shape[1]):
    X[:,i] = label.fit_transform(X[:,i])


