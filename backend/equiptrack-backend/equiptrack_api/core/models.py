from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Store(models.Model):
    brand = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=255, blank=True)  # Google map link
    email = models.EmailField(blank=True)

    def __str__(self):
        return f"{self.brand} - {self.name}"

class Order(models.Model):
    STATUS = [("Draft","Draft"),("In Progress","In Progress"),("Completed","Completed"),("Delayed","Delayed")]
    PRIORITY = [("Low","Low"),("Medium","Medium"),("High","High")]
    PAYMENT = [("Pending","Pending"),("Submitted","Submitted"),("Paid","Paid")]

    id = models.CharField(primary_key=True, max_length=50)  # PO Number
    dept = models.CharField(max_length=100, blank=True)
    pm_name = models.CharField(max_length=100, blank=True)
    region = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    store = models.ForeignKey(Store, on_delete=models.PROTECT, related_name="orders")
    request_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default="Draft")
    priority = models.CharField(max_length=10, choices=PRIORITY, blank=True)
    payment_status = models.CharField(max_length=10, choices=PAYMENT, blank=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.id

class OrderItem(models.Model):
    TYPES = [("AC","AC"),("Compressor","Compressor"),("Other","Other"),("Additional","Additional")]
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    type = models.CharField(max_length=20, choices=TYPES)
    unit_model = models.CharField(max_length=150, blank=True)
    capacity = models.CharField(max_length=50, blank=True)
    voltage = models.CharField(max_length=50, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    brand = models.CharField(max_length=100, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

class Attachment(models.Model):
    TYPE = [("Invoice","Invoice"),("Report","Report"),("Completion","Completion"),("Other","Other")]
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="attachments", null=True, blank=True)
    item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name="attachments", null=True, blank=True)
    type = models.CharField(max_length=20, choices=TYPE, default="Other")
    file_url = models.URLField()

class ServiceRequest(models.Model):
    STATUS = [("Open","Open"),("In Progress","In Progress"),("Closed","Closed")]
    store = models.ForeignKey(Store, on_delete=models.PROTECT, related_name="service_requests")
    order = models.ForeignKey(Order, null=True, blank=True, on_delete=models.SET_NULL)
    invoice_no = models.CharField(max_length=50, blank=True)
    date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default="Open")
    notes = models.TextField(blank=True)

class Lookup(models.Model):
    category = models.CharField(max_length=50)  # e.g. Status, Priority, Type, Payment
    value = models.CharField(max_length=100)
    class Meta:
        unique_together = ("category","value")
