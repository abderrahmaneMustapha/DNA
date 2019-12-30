import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score


data = pd.read_csv("student_bac_path.csv")
X = data["bac_avg"]  
Y = data["bac_path"]

plt.scatter(X,Y)
plt.show()
from sklearn import preprocessing
le = preprocessing.LabelEncoder()
X = le.fit_transform(X)
Y = le.fit_transform(Y)

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, Y, random_state=0)


from sklearn.neighbors import KNeighborsClassifier
logreg = KNeighborsClassifier(n_neighbors=1)
logreg.fit(X, Y)

print(logreg.score(X, Y))



