from rest_framework import serializers
from Subscriptions.models import PaymentHistory, Subscription


# Subscription Serializer
class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['sub_type', 'related_user', 'sub_start_date', 'payment_card']

class SubscriptionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        # only updateable fields
        fields = ['sub_type', 'payment_card']


# payment history serializer
class PaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentHistory
        fields = ['related_user', 'payment_card', 'payment_date', 'payment_amount']

class PaymentHistoryUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentHistory
        # only updateable fields
        fields = ['payment_card', 'payment_date', 'payment_amount']
