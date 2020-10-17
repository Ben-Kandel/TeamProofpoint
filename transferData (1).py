#!/usr/bin/env python
# coding: utf-8

# In[1]:


#Create statistics of the data
#Transfer data from back end database to django database
import sqlite3
import pandas as pd
conn = sqlite3.connect("proofpoint_mockdata.db")
data = pd.read_sql_query("select * from Testing", conn)

e_amount = 0
positive= 0
negative = 0
neutral = 0
for i in data['subject']:
    if i == "Election":
        e_amount +=1
for i in data["P/N"]:
    if i == "Positive":
        positive +=1
    elif i == "Negative":
        negative +=1
    else:
        neutral +=1

        
d = {'Positives': [positive], 'Negatives': [negative], 'Neutrals': [neutral], 'Amount' : [len(data)], 'Election_amount' 
    : [e_amount]}
stats = pd.DataFrame(data = d)
conn2 = sqlite3.connect("db.sqlite3")

data.to_sql('leads_lead', con=conn2, if_exists = "replace")
stats.to_sql('statistics', con=conn2, if_exists = "replace")
data2= pd.read_sql_query("select * from leads_lead", conn2)
test =  pd.read_sql_query("select * from statistics", conn2)
conn.close()
conn2.close()
print("Test")


# In[ ]:





# In[ ]:




