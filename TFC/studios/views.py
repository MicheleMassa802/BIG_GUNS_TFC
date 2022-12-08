from django.shortcuts import render
from Classes.models import Class
from studios.models import Amenities, Studio
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth import login, authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from studios.serializers import StudioSerializer
from geopy.distance import geodesic
from rest_framework.authentication import SessionAuthentication

# Create your views here.

class StudioView(RetrieveAPIView):
    queryset = Studio.objects.all()
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [IsAuthenticated]
    serializer_class = StudioSerializer

    def get(self, request, *args, **kwargs):
        return Response(self.serializer_class(Studio.objects.get(name=kwargs['studio'])).data)


class FilterStudioView(ListAPIView):
    serializer_class = StudioSerializer
    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # returns all studios paginated initially
        initial_queryset = Studio.objects.all()  # full with no filters


        # filtering params
        name = self.request.query_params.get('name', None)
        amenities = self.request.query_params.get('amenities', None)
        class_name = self.request.query_params.get('class_name', None)
        coach = self.request.query_params.get('coach', None)

        if name:
            initial_queryset = initial_queryset.filter(name=name)
        if amenities:
            # fetch amenities from amenities table
            amenities_data = Amenities.objects.filter(type=amenities)
            # filter out from initial_queryset the studios that are not in amenities_data
            initial_queryset = initial_queryset.filter(amenities__in=amenities_data)
        if class_name:
            # fetch classes with this class_name
            classes_data = Class.objects.filter(name=class_name)
            # filter out from initial_queryset the studios that are not in classes_data
            initial_queryset = initial_queryset.filter(class__in=classes_data)
        if coach:
            # fetch classes with this coach
            classes_coach_data = Class.objects.filter(coach=coach)
            # filter out from initial_queryset the studios that are not in classes_coach_data
            initial_queryset = initial_queryset.filter(class__in=classes_coach_data)

        sorted_studios = []
        current_coordinates = (self.kwargs['lat'], self.kwargs['long'])
        # sort by studio coordinates inside initial_queryset
        for studio in initial_queryset:
            studio_coordinates = (studio.latitude, studio.longitude)
            sorted_studios.append((geodesic(studio_coordinates, current_coordinates).kilometers, studio))

        sorted_studios = sorted(sorted_studios)
        # serialize data and return data
        return [studio[1] for studio in sorted_studios]
