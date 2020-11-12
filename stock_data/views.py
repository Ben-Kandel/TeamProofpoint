from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import Stocks_data
from .serializers import Stocks_dataSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class StockListCreate(generics.ListCreateAPIView):
    queryset = Stocks_data.objects.all()
    serializer_class = Stocks_dataSerializer
    # filter_backends = [DjangoFilterBackend]
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']
    #filterset_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']