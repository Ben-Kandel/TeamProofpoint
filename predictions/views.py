from django.shortcuts import render
from .models import Predictions
from .serializers import PredictionsSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class PredictionsListCreate(generics.ListCreateAPIView):
    queryset = Predictions.objects.all()
    serializer_class = PredictionsSerializer
    # filter_backends = [DjangoFilterBackend]
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'subject', 'keyword', 'prediction']
    #filterset_fields = ['id', 'subject', 'sentiment_score', 'keywords', 'date', 'pn']
