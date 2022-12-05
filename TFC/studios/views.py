from django.shortcuts import render
from studios.models import Studio
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

class AllStudiosView(ListAPIView):
    serializer_class = StudioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_coordinates = (self.kwargs['lat'], self.kwargs['long'])
        sorted_studios = []
        for studio in Studio.objects.all():
            studio_coordinates = (studio.latitude, studio.longitude)
            sorted_studios.append((geodesic(studio_coordinates, current_coordinates).kilometers, studio))

        sorted_studios = sorted(sorted_studios)
        return [studio[1] for studio in sorted_studios]


class StudioView(RetrieveAPIView):
    queryset = Studio.objects.all()
    permission_classes = [IsAuthenticated]
    # authentication_classes = [IsAuthenticated]
    serializer_class = StudioSerializer

    # def get(self, request, *args, **kwargs):
    #     return get_object_or_404(Studio, id=kwargs['studio_pk'])


class FilterStudioView(ListAPIView):
    serializer_class = StudioSerializer
    # authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # returns all studios paginated initially
        initial_queryset = Studio.objects.all()  # full with no filters
        # filtering params
        name = self.request.query_params.get('name', None)
        # due to unexpected table creation, these have been put on hold for now
        # amenities = self.request.query_params.get('amenities', None)
        # class_name = self.request.query_params.get('class_name', None)
        # coach = self.request.query_params.get('coach', None)

        print(name)
        if name:
            initial_queryset = initial_queryset.filter(name=name)
        # if amenities:
        #     initial_queryset = initial_queryset.filter(amenities=amenities)
        # if class_name:
        #     initial_queryset = initial_queryset.filter(class_name=class_name)
        # if coach:
        #     initial_queryset = initial_queryset.filter(coach=coach)

        # serialize data and return data
        return initial_queryset
