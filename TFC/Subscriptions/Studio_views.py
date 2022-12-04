########################## NOTE: This is a view for the Studio app views.py ##########################

### Urls.py for studio app links should contain the following: ###
# from django.contrib import admin
# from django.urls import path
# from Studio.views import FilterView, ...
# #from rest_framework_simplejwt.views import TokenObtainPairView

# app_name = "Studios"

# urlpatterns = [
#     path('find_studio/', FilterStudioView.as_view()),
#     path('<int:studio_id>/find_class/', FilterStudioClassView.as_view()),
    
#     # used to generate token (vid 4 1:32:00), to then access django api at
#     # 8000/Subscriptions/<user_id>/update_subscription/edit/ 
#     #path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
# ]

### Stuff within the Studio app views.py file:

import datetime
from studios.models import studio # , studio_class_schedule)
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from Studio.serializers import model serializers in serializers.py file (for studio and studio classes schedule)

# Create your views here.

class FilterStudioView(ListAPIView):
    serializer_class = StudioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # returns all studios paginated initially
        return studio.objects.all()

    def retrieve(self, request, *args, **kwargs):
        # returns all studios that match the filter
        # intially, the url will just be /find_studio/ and will return all studios (when the user first gets here)
        # the vision is that the front end, through a selector, will allow the user to filter by name, amenities, class
        # names, and coaches with classes in those studios, and along with a text input, the user will be able to search 
        # for a studio based on the selected attribute, and the text input, and this will result in a url leading to this
        # same place, but now with a filter applied so that we can respond to it.

        # So here in the backend, we just need to be able to catch this link and see if there is a filter applied
        # and if so, return the studios that match the filter. If no filters match, and filters were provided, nothing is returned.
    
        # url without filters: /find_studio/
        # url with filters: /find_studio/?name=<studioName>&amenities=<amenityValue>&class_name=<cNameValue>&coach=<coachName>
        # so for backend, we test using the query params feature in postman to build the filter url

        initial_queryset = self.get_queryset()  # full with no filters

        # filtering params
        name = self.request.query_params.get('name', None)
        amenities = self.request.query_params.get('amenities', None)
        class_name = self.request.query_params.get('class_name', None)
        coach = self.request.query_params.get('coach', None)

        if name:
            initial_queryset = initial_queryset.filter(name=name)
        if amenities:
            initial_queryset = initial_queryset.filter(amenities=amenities)
        if class_name:
            initial_queryset = initial_queryset.filter(class_name=class_name)
        if coach:
            initial_queryset = initial_queryset.filter(coach=coach)

        # serialize data and return data
        return Response(self.serializer_class(initial_queryset, many=True).data)


class FilterStudioClassView(ListAPIView):
    serializer_class = StudioClassSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # returns all studios paginated initially
        return StudioClass.objects.all()

    def retrieve(self, request, *args, **kwargs):
        # filtering to work the same way as above, based on class name, coach name, date and time range
        # url without filters: /find_class/
        # url with filters: /find_class/?class_name=<cNameValue>&coach=<coachName>&date=<dateValue>&initial_time=<firstTime>&ending_time=<endTime>

        initial_queryset = self.get_queryset()  # full with no filters

        # filtering params
        class_name = self.request.query_params.get('class_name', None)
        coach = self.request.query_params.get('coach', None)
        date = self.request.query_params.get('date', None)
        initial_time = self.request.query_params.get('initial_time', None)
        ending_time = self.request.query_params.get('ending_time', None)

        # NOTE: assuming class_name, coach, date, and time (which is a range of time given by a time pair) are in the model

        if class_name:
            initial_queryset = initial_queryset.filter(class_name=class_name)
        if coach:
            initial_queryset = initial_queryset.filter(coach=coach)
        if date:
            # input format for date is a YYYY-MM-DD string
            # we convert the date string to a date object
            date = datetime.strptime(date, '%Y-%m-%d').date()
            initial_queryset = initial_queryset.filter(date=date)

        if initial_time and ending_time:
            # note, in the model, the time range of a class should be stored as a pair of times,
            # and if the filters initial_time and ending_time overlap the model's time interval,
            # then the instance should be returned.

            # input format for time is a HH:MM:SS string
            # we convert the time string to a time object
            initial_time = datetime.strptime(initial_time, '%H:%M:%S').time()
            ending_time = datetime.strptime(ending_time, '%H:%M:%S').time()
            initial_queryset = initial_queryset.filter(time__range=[initial_time, ending_time])

        # serialize data and return data
        return Response(self.serializer_class(initial_queryset, many=True).data)
        
