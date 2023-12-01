from django.conf import settings

import stripe

from billing.models import Item


stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentIntentService:

    @staticmethod
    def create_intent(price: int) -> stripe.PaymentIntent:
        intent = stripe.PaymentIntent.create(
            amount=price,
            currency='usd',
        )
        
        return intent
