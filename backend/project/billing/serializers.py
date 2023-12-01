from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

from .models import Item, Order


class ItemSerializer(ModelSerializer):

    class Meta:
        model = Item
        fields = ["id", "name", "description", "price"]

class OrderSerializer(ModelSerializer):
    items = PrimaryKeyRelatedField(queryset=Item.objects.all(), many=True)
    class Meta:
        model = Order
        fields = ["items"]