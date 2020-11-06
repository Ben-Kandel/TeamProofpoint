#!/usr/bin/env python
# coding: utf-8

# In[17]:


import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
import numpy as np

dow = pd.read_csv("^GSPC.csv")
sp = pd.read_csv("^DJI.csv")
nasdaq = pd.read_csv("^IXIC.csv")

#-----------------------------------Finished opening files

def getPercentChange(data):
    temp = data.iloc[:-1]
    name = temp.name
    nones = pd.DataFrame([[None]], columns = [name])
    temp = pd.concat([nones, temp]).reset_index(drop = True)
    temp = temp[0]
    
    final = pd.DataFrame(columns = [name + ' Percent Change'])
    for d,i in enumerate(data):
        if d == 0:
            percent = pd.DataFrame([[None]], columns = [name + ' Percent Change'])
        else:
            diff = ((i - temp[d])/temp[d]) * 100
            percent = pd.DataFrame([[diff]], columns = [name + ' Percent Change'])
        final = pd.concat([final, percent]).reset_index(drop = True)
    return final
#-----------------------------------Finish getting percent changes

data = dow[["Date"]]
data['DOW'] = dow['Adj Close']
data['S&P500'] = sp['Adj Close']
data['NASDAQ'] = nasdaq['Adj Close']               
DowPercent = getPercentChange(data['DOW'])
SPPercent = getPercentChange(data['S&P500'])
NasPercent = getPercentChange(data['NASDAQ'])



data = data.join(DowPercent)
data = data.join(SPPercent)
data = data.join(NasPercent)


# In[23]:


get_ipython().run_line_magic('matplotlib', 'inline')

data["DOW Percent Change"][0] = 0
data["S&P500 Percent Change"][0] = 0
data["NASDAQ Percent Change"][0] = 0

y = data["DOW Percent Change"]

finalData = data.drop(columns = ["Date", "DOW Percent Change", "DOW"])
X_train, X_test, y_train, y_test = train_test_split(finalData, y, test_size = 0.6, random_state = 3)
regr = linear_model.LinearRegression()
regr.fit(X_train, y_train)
y_pred_test = regr.predict(X_test)
# Comparing true versus predicted values
plt.scatter(y_test, y_pred_test, color='black')

plt.title('Comparing true and predicted values for test set with spam sentiments')
plt.xlabel('True values for y')
plt.ylabel('Predicted values for y')

# Model evaluation
print("Root mean squared error = %.4f" % np.sqrt(mean_squared_error(y_test, y_pred_test)))
print('R-squared = %.4f' % r2_score(y_test, y_pred_test))


# In[ ]:




