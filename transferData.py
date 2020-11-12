#!/usr/bin/env python
# coding: utf-8

# In[1]:


#Create statistics of the data
#Transfer data from back end database to django database
import sqlite3
import pandas as pd

def transfer(nameDB, copyTable):




    statisticsNameDB = "statistics_" + nameDB

    conn = sqlite3.connect("proofpointDB.db")
    data = pd.read_sql_query(f"select * from {copyTable}", conn)

    e_amount = 0
    positive= 0
    negative = 0
    neutral = 0
    # for i in data['subject']:
    #     if i == "Election":
    #         e_amount +=1
    for i in data["P_N"]:
        if i == "Positive":
            positive +=1
        elif i == "Negative":
            negative +=1
        else:
            neutral +=1

    sentiments = data['ASS']
    d = {'Positives': [positive], 'Negatives': [negative], 'Neutrals': [neutral], 'Amount' : [len(data)], 'Election_amount'
        : [e_amount]}


    stats = pd.DataFrame(data = d)
    conn2 = sqlite3.connect("db.sqlite3")
    data.index.name = "id"
    data.to_sql(nameDB, con=conn2, if_exists = "replace")
    stats.to_sql(statisticsNameDB, con=conn2, if_exists = "replace")

    #------------------------------------------------------Index Funds

    dow = pd.read_csv("^GSPC.csv")
    sp = pd.read_csv("^DJI.csv")
    nasdaq = pd.read_csv("^IXIC.csv")

    master = pd.DataFrame(columns = ["date", "price", "name"])

    for d, i in enumerate(dow['Date']):
        master.loc[len(master.index)] = [dow['Date'][d], dow["Adj Close"][d], "DOW"]
        master.loc[len(master.index)] = [sp['Date'][d], sp["Adj Close"][d], "S&P500"]
        master.loc[len(master.index)] = [nasdaq['Date'][d], nasdaq["Adj Close"][d], "NASDAQ"]

    master.to_sql("prices_prices", con =conn2, if_exists = "replace")


    #------------------------------------------------------------------

    #data2= pd.read_sql_query(f"select * from {nameDB}", conn2)
    #test =  pd.read_sql_query(f"select * from {statisticsNameDB}", conn2)
    conn.close()
    conn2.close()



# In[ ]:





# In[ ]:




