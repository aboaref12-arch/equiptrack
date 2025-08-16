from django.contrib import admin
from .models import Store, Order, OrderItem, Attachment, ServiceRequest, Lookup

admin.site.register(Store)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Attachment)
admin.site.register(ServiceRequest)
admin.site.register(Lookup)
