import pandas as pd
from geopy.distance import great_circle

#filter and drop duplcates rows
data  =  pd.read_csv("AllStudent.csv")
data  =  data.filter(['N°Ins','Adresse']).drop_duplicates()
data.fillna("other", inplace=True)
pd.DataFrame(data).to_csv('clean_adress.csv',index=False)

towns = pd.read_csv("town.csv")

## calculate distance between tiaret univ and each other town
from math import radians
#tiaret,35.3451336,1.2671041,
for i in range(len(towns)):
    tiaret = (35.3451336,1.2671041)
    town= (float(towns['lat'][i]), float(towns['long'][i]))
    towns['distance'][i] = great_circle(tiaret,town).km

pd.DataFrame(towns).to_csv('town_distance.csv',index=False,encoding='utf-8')


#set towns to each adress
adress = pd.read_csv("clean_adress.csv",encoding='utf-8')
town_distance = pd.read_csv("town_distance.csv",encoding='utf-8')
adress['Adresse'].replace(regex=True, inplace=True, to_replace=r'[°\-//]', value=r'')
town_id = []
dayras =  town_distance['dayra'].unique()
find = 0 
for i in range(len(adress)): 
      
    for j in  range(len(town_distance)):
        try:                     
            if  town_distance['town'][j].lower() in  adress['Adresse'][i].lower()  :
                print(town_distance['town'][j])
                town_id.append(town_distance['town'][j])
                find = 1
                break
        except:
            print("An exception occurred in adress ", adress['Adresse'][i].lower() )               
    if find == 0:
        town_id.append("Nane")
    else:
        find = 0   
        
            
print(adress.shape)
print(len(town_id))
adress['town_id'] = town_id
pd.DataFrame(adress).to_csv('town_adress.csv',index=False)