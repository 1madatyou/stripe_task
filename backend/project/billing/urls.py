from django.urls import path

from .views import (

    ItemBuyView,
    ItemRetrieveView,
    ItemListView,

    OrderCreateView,
)


urlpatterns = [
    path('buy/<int:item_id>', ItemBuyView.as_view()),
    path('item/<int:item_id>', ItemRetrieveView.as_view()),
    path('items', ItemListView.as_view()),

    path('create_order', OrderCreateView.as_view())

]