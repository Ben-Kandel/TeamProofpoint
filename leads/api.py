from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer
from django_filters.rest_framework import DjangoFilterBackend



# Lead Viewset
# overided by api.py

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LeadSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'date', 'volume', 'subject', 'ASS', 'P_N']

