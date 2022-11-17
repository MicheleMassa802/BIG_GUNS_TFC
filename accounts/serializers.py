from rest_framework import serializers
from accounts.models import user


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'avatar', 'phone_number']

