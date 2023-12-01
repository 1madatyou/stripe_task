from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Item
from .serializers import ItemSerializer
from .services.payment_intent_service import PaymentIntentService


class ItemBuyView(APIView):

    def get(self, request, item_id, *args, **kwargs):

        try:
            item = Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )

        intent = PaymentIntentService.create_intent(int(item.price))

        return Response({
            'client_secret': intent.client_secret
        }, 200)
    
class ItemRetrieveView(RetrieveAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    lookup_url_kwarg = 'item_id'

class ItemListView(ListAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

