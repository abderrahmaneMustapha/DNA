# To add a new cell, type '# %%'

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


bac =  pd.read_csv("student_bac_path.csv")
algo =  pd.read_csv("result_clean.csv")
algo.info()


# drop status level and current year from bac data set
algo = algo.drop(columns=['id_student','current_year', 'study_level', 'status'])
algo.info()


X = algo['algo_one']
Y = algo['algo_two']

from sklearn.preprocessing import LabelEncoder
label = LabelEncoder()
X = label.fit_transform(X).reshape(-1, 1)
Y = label.fit_transform(Y)


#split data into train and test data
from sklearn.model_selection import train_test_split
x_train , x_test , y_train , y_test = train_test_split(X,Y , test_size = 0.2 , random_state = 90)


#predict and train 
from sklearn.linear_model import LinearRegression
reg = LinearRegression().fit(x_train, y_train)
pred = reg.predict(x_test)

#evaluate model
from sklearn.metrics import r2_score
print("slope ",reg.coef_)
print("intercept ",reg.intercept_)
print("r2 score ",r2_score(y_test,pred,multioutput='variance_weighted'))

plt.scatter(x_test,y_test, color="red")
plt.plot(x_test,pred, color="blue", linewidth=3)
plt.show()

