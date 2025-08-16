from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core import views as core_views

router = routers.DefaultRouter()
router.register(r"stores", core_views.StoreViewSet)
router.register(r"orders", core_views.OrderViewSet)
router.register(r"order-items", core_views.OrderItemViewSet)
router.register(r"attachments", core_views.AttachmentViewSet)
router.register(r"service-requests", core_views.ServiceRequestViewSet)
router.register(r"lookups", core_views.LookupViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include(router.urls)),
]
