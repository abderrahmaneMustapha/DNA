import pandas as pd
from geopy.distance import great_circle

data  =  pd.read_csv("AllStudent.csv")
data  =  data.filter(['N°Ins','Adresse']).drop_duplicates()
pd.DataFrame(data).to_csv('clean_adress.csv',index=False)

towns = pd.read_csv("town.csv")

from math import radians
#tiaret,35.3451336,1.2671041,
for i in range(len(towns)):
    tiaret = (35.3451336,1.2671041)
    town= (float(towns['lat'][i]), float(towns['long'][i]))
    towns['distance'][i] = great_circle(tiaret,town).km

pd.DataFrame(towns).to_csv('town_distance.csv',index=False)

  