
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from prepareData import prepare
x_train , x_test , y_train , y_test = prepare()


from sklearn.linear_model import LogisticRegression
clf = LogisticRegression().fit(x_train, y_train)
pred = clf.predict(x_test)


clf.predict_proba(x_test)


clf.score(x_test, y_test)


from sklearn.metrics import accuracy_score
score =accuracy_score(y_test,pred)
score

