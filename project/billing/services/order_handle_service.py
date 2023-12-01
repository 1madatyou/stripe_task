from typing import List

import stripe

from django.db.models.aggregates import Sum

from billing.models import Item


class OrderHandleService:

    @staticmethod
    def create_order(item_ids: List[int]) -> stripe.PaymentIntent:
        
        items = Item.objects.filter(id__in=item_ids)

        if len(items) != len(item_ids):
            raise Item.DoesNotExist

        order_price = items.aggregate(res=(Sum('price')))['res']

        intent = stripe.PaymentIntent.create(
            amount=int(order_price),
            currency='usd',
        )

        return intent
        
