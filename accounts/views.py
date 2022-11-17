from django.shortcuts import render
from accounts.models import user
from accounts.serializers import UserSerializer
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth import login, authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

# Create your views here.
class CreateUserView(CreateAPIView):
    model = user
    serializer_class = UserSerializer
        # new_user = UserSerializer.create(self, **kwargs)
        # check = authenticate(request, email=request.user.username, password=request.user.password)
        # if check is not None:
        #     login(request, check)

# class LoginUserView(APIView):
#
#     def post(self, request, *args, **kwargs):
#         # if (auth := authenticate(username=request.data.get('username'), password=request.data.get('password'))):
#         if auth := authenticate(username=request.data['username'], password=request.data['password']):
#             login(request, auth)


class UpdateUserView(UpdateAPIView):
    queryset = user.objects.all()
    # permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    # def update(self, request, *args, **kwargs):
    #     profile = self.get_object()
    #     serializer = self.get_serializer(profile, data=request.data, partial=True)
    #
    #     if serializer.is_valid():
    #         serializer.save()
