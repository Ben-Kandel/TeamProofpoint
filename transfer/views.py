from django.shortcuts import render
from django.http import HttpResponse
import sys
import os.path

from transferData import transfer

sys.path.append(os.path.abspath(os.path.join(os.path.dirname('transferData'), os.path.pardir)))

from transferData import transfer
# Create your views here.
def transferDatabase(request):

<<<<<<< HEAD
    transfer("leads_lead", "stats", "proofpointDB.db")
    transfer("stocks_stocks", "statsStocks", "proofpointDBnewnew.db")

=======
    transfer("leads_lead", "stats")
>>>>>>> 0d370a9d1f406c47a1be49abbdd9776e05dad6dd
    # transfer("stocks_stocks", "trumpTesting")
    # transfer("consumers_consumer", "realData")
    return HttpResponse("Transfer Complete!")
