import matplotlib.pyplot as plt
import seaborn as sns
sns.set()

from prepareData import prepare
X_train, X_test, y_train, y_test = prepare()
from sklearn.cluster import KMeans
# kmeans

kmean = KMeans(n_clusters=3, random_state=0)
kmean.fit(X_train)

clusters = X_train
pred=kmean.predict(X_test)

from sklearn.metrics import accuracy_score
accuracy = accuracy_score(y_test, pred)
print(accuracy)

plt.scatter( X_test[:,8]  , X_test[:,0] ,c = pred, cmap='rainbow')
plt.show()
