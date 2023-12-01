from django.db.models.aggregates import Sum 

from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Item
from .serializers import ItemSerializer, OrderSerializer
from .services.order_handle_service import OrderHandleService
from .services.item_handle_service import ItemHandleService


class ItemBuyView(APIView):

    def get(self, request, item_id, *args, **kwargs):

        try:
            intent = ItemHandleService.create_purchase(item_id)
        except Item.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )

        return Response({
            'client_secret': intent.client_secret
        }, status.HTTP_200_OK)
    
class OrderCreateView(APIView):

    def post(self, request, *args, **kwargs):
        
        serializer = OrderSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        intent = OrderHandleService.create_order(serializer.data['items'])

        return Response({
            'client_secret': intent.client_secret,   
        }, status.HTTP_200_OK)
    
class ItemRetrieveView(RetrieveAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    lookup_url_kwarg = 'item_id'

class ItemListView(ListAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

