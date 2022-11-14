from django.contrib import admin

# Register your models here.

from Subscriptions.models import Subscription, PaymentHistory

# everything in a subscription is editable, so we can just register it (no need to create a custom admin class)
admin.site.register(Subscription)

# not asked for in handout but handy to have
admin.site.register(PaymentHistory)

