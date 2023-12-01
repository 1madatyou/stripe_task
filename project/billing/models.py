from django.db import models


class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"Item: {self.name}[{self.id}]"

class Order(models.Model):
    items = models.ManyToManyField(to=Item)

    def __str__(self):
        return f"Order[{self.id}]"

class Discount(models.Model):
    item = models.ForeignKey(to=Order, on_delete=models.CASCADE, related_name='discount')
    amount = models.DecimalField(max_digits=5, decimal_places=2)

class Tax(models.Model):
    item = models.ForeignKey(to=Order, on_delete=models.CASCADE, related_name='tax')
    amount = models.DecimalField(max_digits=5, decimal_places=2)