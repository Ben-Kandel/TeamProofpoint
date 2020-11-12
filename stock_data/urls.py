from rest_framework import routers
from .api import Stocks_dataViewSet

router = routers.DefaultRouter()
router.register('api/stock_data', Stocks_dataViewSet, 'stock_data')

urlpatterns = router.urls