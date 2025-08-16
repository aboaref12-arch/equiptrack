from rest_framework import serializers
from .models import Store, Order, OrderItem, Attachment, ServiceRequest, Lookup

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = "__all__"

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    attachments = AttachmentSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = "__all__"

class ServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequest
        fields = "__all__"

class LookupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lookup
        fields = "__all__"
