from rest_framework import routers
from .api import StocksViewSet

router = routers.DefaultRouter()
router.register('api/stocks', StocksViewSet, 'stocks')

urlpatterns = router.urls
