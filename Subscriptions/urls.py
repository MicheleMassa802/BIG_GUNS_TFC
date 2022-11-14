from django.urls import path
from Subscriptions.views import PaymentHistoryView, SubscriptionView

app_name = "Subscriptions"

urlpatterns = [
    path('<int:user_id>/payment_history/', PaymentHistoryView.as_view()),
    path('<int:user_id>/subscription_page/', SubscriptionView.as_view()), 
]