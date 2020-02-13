import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from prepareData import prepare
X_train, X_test, y_train, y_test = prepare()


from sklearn.ensemble import AdaBoostClassifier
clf = AdaBoostClassifier(n_estimators=110,  algorithm='SAMME')
clf.fit(X_train, y_train)

pred = clf.predict(X_test)

from sklearn.metrics import accuracy_score
accuracy = accuracy_score(y_test, pred)
print(" accuracy ",accuracy)