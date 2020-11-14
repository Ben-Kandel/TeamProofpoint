from rest_framework import routers
from .api import PredictionsViewSet

router = routers.DefaultRouter()
router.register('api/predictions', PredictionsViewSet, 'predictions')

urlpatterns = router.urls