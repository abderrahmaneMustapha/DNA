# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
#import packages
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score


# %%
data = pd.read_csv("student_bac_path.csv")

#drop student id and bac id
data = data.drop(['bac_id','student_id','scholar_year'], axis=1)
data


# %%
data.info()


# %%
Y  =  data['status'].copy()
Y


# %%

X= data.loc[:, data.columns != 'status']


X.info()


# %%
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


# %%
#convert Y axis to numeric
Y,_  = pd.factorize(Y)
Y


# %%
#slplit data to train and test
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, Y, random_state=0)


# %%
#train
from sklearn import svm
clf = svm.SVC(kernel="linear", C=0.5)
clf.fit(X_train,y_train)


# %%
#predict
pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, pred)
print(" accuracy ",accuracy)


# %%

