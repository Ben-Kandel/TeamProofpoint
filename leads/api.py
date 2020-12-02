from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer
from django_filters.rest_framework import DjangoFilterBackend



# Lead Viewset
# overided by api.py

class LeadViewSet(viewsets.ModelViewSet):
    # manages api view
    queryset = Lead.objects.all()
    # what is allowed to make calls
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LeadSerializer
    # manages search filters for api
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'date', 'volume', 'subject', 'ASS', 'P_N', 'url', 'attachment']

