from prepareData import prepare

X_train, X_test, y_train, y_test = prepare()
#
# S  V  M

#train
from sklearn import svm
clf = svm.SVC(kernel="linear", C=0.5)
clf.fit(X_train,y_train)

#predict
pred = clf.predict(X_test)

from sklearn.metrics import accuracy_score
accuracy = accuracy_score(y_test, pred)
print(" accuracy ",accuracy)
