from django.db import models
from django.db.models import CASCADE
from django.contrib.auth.models import User  # NOTE: might need to modify to the application specific user model

# Create your models here.

PAYMENT_AMOUNTS = (
        (14.99, "Monthly: $14.99"),
        (149.99, "Yearly: $149.99"),
    )

class Subscription(models.Model):
    sub_type = models.FloatField(choices=PAYMENT_AMOUNTS)
    related_user = models.OneToOneField(to=User, on_delete=models.CASCADE) # comes from the user model
    sub_start_date = models.DateField()  # date the subscription starts 
    # (I dont use auto_now since a model instance should be changeable with the same date)
    payment_card = models.CharField(max_length=16)  # which we ask the user for at time of subscription

    def __str__(self):
        return f"{self.related_user.username}'s subscription!"



# I know there seems to be a lot of repeated data, but its the best way to keep info easy to access
class PaymentHistory(models.Model):
    # each payment corresponds to a user
    related_user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    payment_card = models.CharField(max_length=16)  # which we fetch from the logged in user's Subscription model
    payment_date = models.DateField()  # date the payment was made
    # amount paid (14.99 or 149.99)
    payment_amount = models.FloatField(choices=PAYMENT_AMOUNTS)

    def __str__(self):
        return f"{self.related_user.username}'s payment history on {self.payment_date}!"
    

