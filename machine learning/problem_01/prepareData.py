import pandas as pd
import numpy as np


def prepare():
    

    data_x = pd.read_csv('student_master.csv')
    data_y = pd.read_csv('student_master_branchs.csv')

    data_x = data_x.drop(columns=['id_student','gender','nationality','age','bac_wilaya'])

    X  = data_x.loc[:,:].values
    Y  = data_y['title_branch']
   
    from sklearn.preprocessing import LabelEncoder
    label = LabelEncoder()
    for i in range(0,X.shape[1]):
        X[:,i] = label.fit_transform(X[:,i])
    Y = label.fit_transform(Y)

    from sklearn.model_selection import train_test_split
    x_train , x_test , y_train , y_test = train_test_split(X,Y , test_size = 0.2 , random_state = 40)
    return  x_train , x_test , y_train , y_test
