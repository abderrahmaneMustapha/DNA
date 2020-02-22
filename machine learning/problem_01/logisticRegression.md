```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```


```python
from sklearn.model_selection import train_test_split
from prepareData import prepare
x_train , x_test , y_train , y_test = prepare()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 1762 entries, 0 to 1761
    Data columns (total 6 columns):
    id_student      1762 non-null int64
    algo_one        1762 non-null float64
    algo_two        1762 non-null float64
    current_year    1762 non-null int64
    study_level     1762 non-null object
    status          1762 non-null object
    dtypes: float64(2), int64(2), object(2)
    memory usage: 82.7+ KB
    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 4569 entries, 0 to 4568
    Data columns (total 12 columns):
    id_student      4569 non-null int64
    gender          4569 non-null object
    level           4567 non-null float64
    repeated        4568 non-null object
    status          4568 non-null object
    study_path      4567 non-null object
    scholar_year    4567 non-null float64
    bac_id          4568 non-null object
    bac_year        4569 non-null float64
    bac_path        4568 non-null object
    bac_feedback    4568 non-null object
    bac_avg         4568 non-null float64
    dtypes: float64(4), int64(1), object(7)
    memory usage: 428.5+ KB
    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 3622 entries, 0 to 3625
    Data columns (total 16 columns):
    id_student      3622 non-null int64
    gender          3622 non-null object
    level           3622 non-null float64
    repeated        3622 non-null object
    status          3622 non-null object
    study_path      3622 non-null object
    scholar_year    3622 non-null float64
    bac_id          3622 non-null object
    bac_year        3622 non-null float64
    bac_path        3622 non-null object
    bac_feedback    3622 non-null object
    bac_avg         3622 non-null float64
    algo_one        3622 non-null float64
    algo_two        3622 non-null float64
    current_year    3622 non-null int64
    study_level     3622 non-null object
    dtypes: float64(6), int64(2), object(8)
    memory usage: 481.0+ KB
    


```python
from sklearn.linear_model import LogisticRegression
clf = LogisticRegression().fit(x_train, y_train)
pred = clf.predict(x_test)
```


```python
clf.predict_proba(x_test)
```




    array([[9.49085208e-074, 1.46367344e-025, 1.74460481e-019, ...,
            3.30512914e-004, 3.05529044e-004, 4.06130565e-004],
           [1.85920464e-117, 3.32816309e-039, 2.48262917e-030, ...,
            5.94932279e-004, 1.61243381e-004, 2.85972004e-003],
           [2.87410505e-096, 1.72375814e-032, 2.76044537e-025, ...,
            8.74351965e-005, 6.14759950e-005, 5.54773507e-003],
           ...,
           [2.78266513e-032, 6.20862167e-012, 1.54629088e-009, ...,
            1.31817341e-003, 1.04257594e-003, 2.57895275e-004],
           [3.32484560e-019, 5.70812751e-008, 1.74502162e-006, ...,
            9.84075480e-006, 1.75333581e-005, 5.83812540e-006],
           [3.30238178e-021, 1.50982626e-008, 1.19651209e-006, ...,
            3.53146721e-005, 1.10797653e-006, 9.13580623e-006]])




```python
clf.score(x_test, y_test)
```




    0.2686292548298068




```python
from sklearn.metrics import accuracy_score
score =accuracy_score(y_test,pred)
score
```




    0.2686292548298068


