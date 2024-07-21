from django.conf import settings

import stripe

from billing.models import Item

stripe.api_key = settings.STRIPE_SECRET_KEY


class ItemHandleService:

    @staticmethod
    def create_purchase(item_id: int) -> stripe.PaymentIntent:

        item = Item.objects.get(id=item_id)

        intent = stripe.PaymentIntent.create(
            amount=int(item.price),
            currency="usd",
        )

        return intent
