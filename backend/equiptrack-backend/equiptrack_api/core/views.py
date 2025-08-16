from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Store, Order, OrderItem, Attachment, ServiceRequest, Lookup
from .serializers import (
    StoreSerializer, OrderSerializer, OrderItemSerializer,
    AttachmentSerializer, ServiceRequestSerializer, LookupSerializer
)

class BaseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = "__all__"
    search_fields = "__all__"
    filterset_fields = "__all__"

class StoreViewSet(BaseViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class OrderViewSet(BaseViewSet):
    queryset = Order.objects.all().select_related("store","created_by")
    serializer_class = OrderSerializer

class OrderItemViewSet(BaseViewSet):
    queryset = OrderItem.objects.all().select_related("order")
    serializer_class = OrderItemSerializer

class AttachmentViewSet(BaseViewSet):
    queryset = Attachment.objects.all().select_related("order","item")
    serializer_class = AttachmentSerializer

class ServiceRequestViewSet(BaseViewSet):
    queryset = ServiceRequest.objects.all().select_related("store","order")
    serializer_class = ServiceRequestSerializer

class LookupViewSet(BaseViewSet):
    queryset = Lookup.objects.all()
    serializer_class = LookupSerializer
