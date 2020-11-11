# -*- coding: utf-8 -*-
"""
Created on Wed Nov 11 17:02:12 2020

@author: scott
"""

import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import sqlite3

database = "fullproofpointDB.db"
conn = sqlite3.connect(database)
curr = conn.cursor()

#collects # of emails of positive or negative sentiment for each candidate
sql = '''SELECT COUNT(sentiment_score) FROM realData WHERE keyword="Trump" AND P_N="POSITIVE"; '''
curr.execute(sql)
posTrump = curr.fetchone()[0]
sql = '''SELECT COUNT(sentiment_score) FROM realData WHERE keyword="Trump" AND P_N="NEGATIVE"; '''
curr.execute(sql)
negTrump = curr.fetchone()[0]
sql = '''SELECT COUNT(sentiment_score) FROM realData WHERE keyword="Biden" AND P_N="POSITIVE"; '''
curr.execute(sql)
posBiden = curr.fetchone()[0]
sql = '''SELECT COUNT(sentiment_score) FROM realData WHERE keyword="Biden" AND P_N="NEGATIVE"; '''
curr.execute(sql)
negBiden = curr.fetchone()[0]

totalCount = posTrump + posBiden + negTrump + negBiden

#collects average sentiment of a positive/negative email for each candidate
sql = '''SELECT AVG(sentiment_score) FROM realData WHERE keyword="Trump" AND P_N="POSITIVE"; '''
curr.execute(sql)
avgPosTrump = curr.fetchone()[0]
sql = '''SELECT AVG(sentiment_score) FROM realData WHERE keyword="Trump" AND P_N="NEGATIVE"; '''
curr.execute(sql)
avgNegTrump = curr.fetchone()[0]
sql = '''SELECT AVG(sentiment_score) FROM realData WHERE keyword="Biden" AND P_N="POSITIVE"; '''
curr.execute(sql)
avgPosBiden = curr.fetchone()[0]
sql = '''SELECT AVG(sentiment_score) FROM realData WHERE keyword="Biden" AND P_N="NEGATIVE"; '''
curr.execute(sql)
avgNegBiden = curr.fetchone()[0]


#data set of pre election favorability v percent of popular vote 
x = np.array([51,43,56,50,56,55,52,51,50,62,46,55,43,34])
y = np.array([53.5,46.5,54.7,45.3,48.4,47.9,48.3,50.7,45.7,52.9,47.2,51.1,51.1,48.9])


x = x.reshape(-1,1)
y = y.reshape(-1,1)

#gives each candidate a score based on # of pos/neg emails weighted by average sentiment of that type of email
trumpScore = ((posTrump * avgPosTrump) + (negBiden * avgNegBiden)) / (posTrump+negBiden+negTrump+posBiden)
bidenScore = ((posBiden * avgPosBiden) + (negTrump * avgNegTrump)) / (posBiden+negTrump+negBiden+posTrump)

reg = LinearRegression().fit(x,y)

print(reg.predict(np.array([trumpScore*100]).reshape(-1,1)))
print(reg.predict(np.array([bidenScore*100]).reshape(-1,1)))



