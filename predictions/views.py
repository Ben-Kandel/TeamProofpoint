from django.shortcuts import render
from .models import Predictions
from .serializers import PredictionsSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class PredictionsListCreate(generics.ListCreateAPIView):
    # control view for api (necessary but never seen)
    queryset = Predictions.objects.all()
    serializer_class = PredictionsSerializer

    # settings for search filters
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'subject', 'keyword', 'prediction']

