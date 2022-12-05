from rest_framework import serializers
from studios.models import Studio, Images, Amenities


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['studio', 'image']


class AmenitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenities
        fields = ['studio', 'type', 'quantity']


class StudioSerializer(serializers.ModelSerializer):
    images = ImagesSerializer(many=True)
    amenities = AmenitiesSerializer(many=True)
    class Meta:
        model = Studio
        fields = ['name', 'address', 'latitude', 'longitude', 'postal_code', 'phone_number', 'images', 'amenities']
