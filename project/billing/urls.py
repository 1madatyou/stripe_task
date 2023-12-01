from django.urls import path

from .views import ItemBuyView, ItemRetrieveView


urlpatterns = [
    path('buy/<int:item_id>', ItemBuyView.as_view()),
    path('item/<int:item_id>', ItemRetrieveView.as_view()),

]