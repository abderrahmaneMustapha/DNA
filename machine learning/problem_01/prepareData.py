
import pandas as pd
import numpy as np




def prepare():
    student_bac_path
    bac =  pd.read_csv("result_clean.csv")
    algo =  pd.read_csv("result_clean.csv")

    result = pd.concat([algo, bac], axis=1, sort=False)

    print(result.head())

prepare()