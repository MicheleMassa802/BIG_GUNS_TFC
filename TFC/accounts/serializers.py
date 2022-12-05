from rest_framework import serializers
from accounts.models import user


# User Serializer
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'avatar', 'phone_number']

    def create(self, validated_data):
        password = validated_data.pop('password')
        curr_user = super().create(validated_data)
        curr_user.set_password(password)
        curr_user.save()
        return curr_user

