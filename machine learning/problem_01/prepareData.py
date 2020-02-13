
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt



def prepare():
    algo =  pd.read_csv("result_clean.csv")
    algo.info()

    bac =  pd.read_csv("student_bac_path.csv")
    bac = bac.rename(columns={"student_id": "id_student"})
    bac.info()

    #merge csv
    merge = bac.merge(algo, how='inner').drop_duplicates()
    merge.info()

    merge.head()

    merge = merge.drop(columns=['id_student','level','repeated', 'repeated', 'scholar_year', 'bac_id','current_year','study_path','study_level','status'])

    Y = merge['algo_two'].values
    X = merge.drop(columns=['algo_two']).values
    
    #encode data 
    from sklearn.preprocessing import LabelEncoder
    label = LabelEncoder()
    for i in range(0,6):
        X[:,i] = label.fit_transform(X[:,i])
    Y = label.fit_transform(X[:,i])

    X = X.astype('int')
    X

    Y = Y.astype('int')
    Y

    from sklearn.model_selection import train_test_split
    x_train , x_test , y_train , y_test = train_test_split(X,Y , test_size = 0.3 , random_state =40)
    return x_train , x_test , y_train , y_test
