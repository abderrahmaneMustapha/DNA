import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()
from sklearn.cluster import KMeans

data_x = pd.read_csv('student_master.csv')
data_y = pd.read_csv('student_master_branchs.csv')

plt.scatter(data_x['semester_1_avg'], data_x['bac_average'])
plt.show()

kmean = KMeans(2)
kmean.fit(data_x)

clusters = x.copy()
clusters['cluster_pred']=kmean.fit_predict(x)