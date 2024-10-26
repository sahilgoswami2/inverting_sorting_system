from django.contrib import admin
from django.urls import path, include
from inventory.views import ProductViewSet, SoldProductViewSet, RegisterUser, LoginUser
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'sold-products', SoldProductViewSet)  # Register SoldProductViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterUser.as_view(), name='register'),
    path('api/login/', LoginUser.as_view(), name='login'),
]