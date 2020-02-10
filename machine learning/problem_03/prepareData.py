
#import packages
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt



def prepare():
    data = pd.read_csv("student_bac_path.csv")

    #drop student id and bac id
    data = data.drop(['bac_id','student_id','scholar_year'], axis=1)

    #enable this comment to see info about data

    #data.info()
    Y  =  data['status'].copy()

    X= data.loc[:, data.columns != 'status']

    #convert X axis to numeric
    X['gender'],_  = pd.factorize(X['gender'])
    X['level'],_  = pd.factorize(X['level'])
    X['repeated'],_  = pd.factorize(X['repeated'])
    X['study_path'],_  = pd.factorize(X['study_path'])
    X['bac_year'],_  = pd.factorize(X['bac_year'])
    X['bac_path'],_  = pd.factorize(X['bac_path'])
    X['bac_feedback'],_  = pd.factorize(X['bac_feedback'])
    X['bac_avg'],_  = pd.factorize(X['bac_avg'])
    X.info()

    Y,_  = pd.factorize(Y)



    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=42)
    return X_train, X_test, y_train, y_test