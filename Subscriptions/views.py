from datetime import datetime, timedelta
from Subscriptions.models import PaymentHistory, Subscription
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from Subscriptions.serializers import PaymentHistorySerializer, SubscriptionSerializer, SubscriptionUpdateSerializer, PaymentHistoryUpdateSerializer
  

# Subscription 'CRUD' View
# I'll say that we would have tried to do the proper CreateApiView, UpdateApiView, DestroyApiView, ... but 
# we kind of weren't taught how to customize those classes which is needed in this case

class SubscriptionView(APIView):
    permission_classes = [IsAuthenticated]  # checks if user is logged in and exists
    serializer_class = SubscriptionSerializer  # for payment history, we will use the PaymentHistorySerializer


    def get(self, request, *args, **kwargs):
        # get user id and check if user is in subscription table
        filtered_sub = Subscription.objects.filter(related_user=request.user)

        # return the subscription info of this user
        if filtered_sub.exists():
            return Response(self.serializer_class(filtered_sub.first()).data)
        else:
            return Response({'message': 'User is not subscribed'})


    def post(self, request, *args, **kwargs):
        # make sure user is not already subscribed
        is_subbed = Subscription.objects.filter(related_user=request.user).exists()

        if is_subbed:
            return Response({'message': 'User is already subscribed'})

        # create a new subscription object using the post data
        
        post_data = request.data
        sub_serializer = self.serializer_class(data=post_data)
        
        if not sub_serializer.is_valid():
            return Response(sub_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # otherwise, save the created object
        sub_serializer.save()
        
        # after saving the created subscription object, we need to create the payment history objects

        if post_data['sub_type'] == str(14.99):
            extra_days = 30
        else:
            extra_days = 365

        # we create a copy of the post data to use for the serialization of the payment history objects
        post_data_copy = post_data.copy()
        post_data_copy['payment_amount'] = post_data['sub_type']  # sub type in subscription == payment amount in payment history
        post_data_copy['payment_date'] = post_data['sub_start_date']  # sub start date in subscription == day of payment in payment history
        
        # create the payment history object with todays date
        payment_serializer = PaymentHistorySerializer(data=post_data_copy)
        if not payment_serializer.is_valid():
            return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # otherwise, save the created object
        payment_serializer.save()

        # create the payment history object with the following date that is extra_days away by transforming
        # post_data['sub_start_date'] into a datetime object
        date_plus_extra = datetime.strptime(post_data['sub_start_date'], '%Y-%m-%d') + timedelta(days=extra_days)
        post_data_copy['payment_date'] = datetime.date(date_plus_extra)

        payment_serializer = PaymentHistorySerializer(data=post_data_copy)
        if not payment_serializer.is_valid():
            return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # otherwise, save the created object
        payment_serializer.save()

        # return the subscription object just created
        return Response(sub_serializer.data, status=status.HTTP_201_CREATED)
    

    def put(self, request, *args, **kwargs):
        # make sure user is subscribed
        filtered_sub = Subscription.objects.filter(related_user=request.user)

        if not filtered_sub.exists():
            return Response({'message': 'User is not subscribed'})

        sub = filtered_sub.first()  # get the subscription object
        
        post_data = request.data

        original_sub_type = sub.sub_type  # get the original sub type for later use
        original_date = sub.sub_start_date  # get the original sub start date for later use

        # update the subscription object except for the sub_start_date
        sub_upt_serializer = SubscriptionUpdateSerializer(sub, data=post_data)
        if not sub_upt_serializer.is_valid():
            return Response(sub_upt_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # otherwise, save the updated object
        sub_upt_serializer.save()
        
        # we create a copy of the post data to use for the serialization of the payment history objects
        post_data_copy = post_data.copy()
        post_data_copy['payment_amount'] = post_data['sub_type']  # sub type in subscription == payment amount in payment history
        post_data_copy['payment_date'] = str(original_date)  # sub start date in subscription == day of payment in payment history

        if post_data['sub_type'] == str(14.99):
            extra_days = 30
        else:
            extra_days = 365

        if original_sub_type == 14.99:
            original_extra_days = 30
        else:
            original_extra_days = 365

        # create the payment history object with the following date
        date_plus_extra = sub.sub_start_date + timedelta(days=original_extra_days)

        # then update the current and future payment history objects
        payment1 = PaymentHistory.objects.filter(related_user=request.user, payment_date=sub.sub_start_date).first()
        payment2 = PaymentHistory.objects.filter(related_user=request.user, payment_date=date_plus_extra).first()
        
        # update the first payment history object
        payment_upt_serializer = PaymentHistoryUpdateSerializer(payment1, data=post_data_copy)
        if not payment_upt_serializer.is_valid():
            return Response(payment_upt_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # otherwise, save the update
        payment_upt_serializer.update(payment1, payment_upt_serializer.validated_data)
        
        # update the second payment history object
        post_data_copy['payment_date'] = sub.sub_start_date + timedelta(days=extra_days)

        payment_upt_serializer = PaymentHistoryUpdateSerializer(payment2, data=post_data_copy)
        if not payment_upt_serializer.is_valid():
            return Response(payment_upt_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # otherwise, save the update
        payment_upt_serializer.update(payment2, payment_upt_serializer.validated_data)

        # return the updated subscription object corresponding to the user
        return Response(self.serializer_class(Subscription.objects.get(related_user=request.user)).data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        # make sure user is subscribed
        filtered_sub = Subscription.objects.filter(related_user=request.user)

        if not filtered_sub.exists():
            return Response({'message': 'User is not subscribed'})

        # delete the subscription object row
        sub = filtered_sub.first()
        sub.delete()

        # delete the payment history objects
        payments = PaymentHistory.objects.filter(related_user=request.user).order_by('-payment_date')[:2]
        # eliminate both elements in the list
        payments.first().delete()
        payments.first().delete()


        return Response({"message": "Subscription deleted"}, status=status.HTTP_204_NO_CONTENT)


# Payment History Listing View
# Display the payment history list for the logged in user, this is >1 row therefore listAPI is used
class PaymentHistoryView(ListAPIView):

    serializer_class = PaymentHistorySerializer

    def get_queryset(self):

        payment_history = PaymentHistory.objects.filter(related_user=self.request.user)

        if payment_history.exists():
            return payment_history.order_by('-payment_date')
        # since we are paginating and cant return an empty list, if a user has no payment history,
        # we return a list with a single empty object
        return [PaymentHistory()]
        

