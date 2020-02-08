import matplotlib.pyplot as plt
import seaborn as sns

from prepareData import prepare
data_x,  data_y, X, Y = prepare()
from sklearn.cluster import KMeans

plt.scatter( data_x['bac_average']  ,data_x['semsters_avg'] , c = Y, cmap='rainbow')
plt.show()

# kmeans
kmean = KMeans(n_clusters=3, random_state=0)

clusters = X
pred=kmean.fit_predict(X)



plt.scatter(data_x['bac_average'], data_x['semsters_avg'], c = pred, cmap='rainbow')
plt.show()

#evaluate clusetring 
from sklearn import metrics
kmean_metric = metrics.adjusted_rand_score(Y, pred)
print(kmean_metric)