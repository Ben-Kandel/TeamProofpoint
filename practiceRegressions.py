# -*- coding: utf-8 -*-
"""
Created on Tue Nov  3 12:19:15 2020

@author: scott
"""

import numpy as np
from sklearn.linear_model import LinearRegression

posTrump = 12554
negTrump = 28212
posBiden = 3291
negBiden = 9968

#commented out arrays are other predictors that could be used
#in model, result and r^2 are commented below each model

#x = np.array([51,43,56,50,56,55,52,51,50,62,46,55,43,34])
#y = np.array([370,168,379,159,266,271,251,286,173,365,206,332,227,304])
#set of pre-election favorability v electoral votes won
#r^2 = 0.5966
#result is Trump 243 45% Biden 295 55%
#1 factor r^2 = 0.18
#result is Trump 244 45% Biden 294 55%

#x = np.array([50,56,52,51,46,55])
#y = np.array([159,379,251,286,206,332])
#set of pre-election favorability of candidates running for re-election v electoral votes won
#r^2 = 0.8952
#result is Trump 190 35% Biden 348 65%
#1 factor r^2 = 0.68
#result is Trump 159 29% Biden 379 71%    

#x = np.array([68,56,37,58,34,54,48,50])
#y = np.array([0.86,0.96,0.09,0.98,0.312,0.70,0.53,0.62])
#set of pre-election job approval v percent of electoral votes won for candidates running for re-election
#r^2 = 0.7715
#result is Trump 264 49% Biden 274 51%

x = np.array([51,43,56,50,56,55,52,51,50,62,46,55,43,34])
y = np.array([43.0,37.4,49.2,40.7,48.4,47.9,48.3,50.7,45.7,52.9,47.2,51.1,48.1,46.1])
#pre election favorability vs percent of total votes since 1992
#r^2 = 0.2575
#result is Trump 45.3% of votes, Biden 48.6% of votes, if you
#add 3% to each to normalize to Trump 48.3% of votes v Biden 51.6%
#of votes

x = x.reshape(-1,1)
y = y.reshape(-1,1)

trumpScore = ((posTrump * 0.41) + (negBiden * 0.5)) / (posTrump+negBiden)
bidenScore = ((posBiden * 0.46) + (negTrump * 0.57)) / (posBiden+negTrump)

reg = LinearRegression().fit(x,y)
#print(reg.score(x,y))
print(reg.predict(np.array([trumpScore*100]).reshape(-1,1)))
print(reg.predict(np.array([bidenScore*100]).reshape(-1,1)))

#print(reg.get_params())
#print(reg.intercept_)
#print(reg.coef_)
