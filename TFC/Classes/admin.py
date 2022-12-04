from django.contrib import admin

from Classes.models import Class, UserClasses

# Register your models here.

# everything in a subscription is editable, so we can just register it (no need to create a custom admin class)
admin.site.register(Class)
admin.site.register(UserClasses)