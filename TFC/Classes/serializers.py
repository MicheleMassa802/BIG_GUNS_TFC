from rest_framework import serializers, status
from rest_framework.response import Response

from Classes.models import Class, UserClasses


# Subscription Serializer
class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'
        # fields = ['studio', 'name', 'description', 'coach', 'keywords', 'capacity', 'start_time', 'end_time', 'is_cancelled']
        # read_only_fields = ['studio', 'name', 'description', 'coach', 'keywords', 'capacity', 'start_time', 'end_time']


class UserSerializer(serializers.ModelSerializer):
    user_info = ClassSerializer(many=True, read_only=True)

    class Meta:
        model = UserClasses
        fields = '__all__'
        # read_only_fields = ['user', 'class_info', 'modify_future_classes']
        # extra_kwargs = {
        #     'user': {'write_only': True},
        #     'class_info': {'write_only': True},
        #     'modify_future_classes': {'write_only': True}
        # }
        # classes is the model instance directly so i CAN USE THIS FOR GETTING UNIQUE ID OF CLASS THAT I WANT TO DROP

# Make new serializer for delete classes and migrate UserClasses to show class_to_drop and stuff
