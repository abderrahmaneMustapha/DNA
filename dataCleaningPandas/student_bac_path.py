import pandas as pd
import math
paths  =  pd.read_csv("Séries.csv")
paths = paths.drop(columns="Série_Ar")
pd.DataFrame(paths).to_csv('paths.csv',index=False)
u_paths =  pd.read_csv("paths.csv")
"""
bac = pd.read_csv("C:/Users/icom/myProjects/DNA/UnivDataset/student_bac_path.csv")
bac = bac.drop(columns="year_avg")

for i in range(len(bac)):
    if bac["status"][i] in  ("Admis/Session1","Admis/Session2","Admis/Dettes"):
        bac["status"][i] = "Admis"
    elif bac["status"][i] == "Ajourné":
        bac["status"][i] = "Ajourne"
pd.DataFrame(bac).to_csv('bac.csv',index=False)
"""


bac  =  pd.read_csv("bac.csv") 
arr = [[],[],[],[]]  # s tm  m other

for i in range(len(paths)):
        if u_paths["Série"][i] == "S":
            arr[0].append(u_paths["N_Série"][i])
        if u_paths["Série"][i] == "TM":
            arr[1].append(u_paths["N_Série"][i])
        if u_paths["Série"][i] == "M":
            arr[2].append(u_paths["N_Série"][i])
        if u_paths["Série"][i] == "other":
            arr[3].append(u_paths["N_Série"][i])
        
print(arr[0])
print(arr[1])
print(arr[2]) 
print(arr[3])


for i in range(len(bac)):
  
    if  math.isnan(bac["bac_year"][i]):
        bac["bac_year"][i] = "0"
    else:
        bac["bac_year"][i] = str(int(bac["bac_year"][i]))

    if bac["bac_path"][i] in tuple(arr[0]):
        bac["bac_path"][i] =  "S"
    else:
        if bac["bac_path"][i] in tuple(arr[1]):
            bac["bac_path"][i] =  "TM"  
        else:
            if bac["bac_path"][i] in tuple(arr[2]):
                bac["bac_path"][i] =  "M"  
            else:
                if bac["bac_path"][i] in tuple(arr[3]):
                    bac["bac_path"][i] =  "other"         
pd.DataFrame(bac).to_csv('bac.csv',index=False)
