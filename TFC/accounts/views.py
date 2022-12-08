from django.shortcuts import render
from accounts.models import user
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth import login, authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

# Create your views here.

class GetUser(RetrieveAPIView):
    queryset = user.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        return Response(self.request.user.id)
    
class GetProfile(RetrieveAPIView):
    queryset = user.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        return Response(self.request.user)

class CreateUserView(CreateAPIView):
    model = user
    serializer_class = UserSerializer

    # def post(self, request, *args, **kwargs):
    #     final_user = user.objects.create(
    #         username=request.data.get("username"),
    #         email=request.data.get("email"),
    #         first_name=request.data.get("first_name"),
    #         last_name=request.data.get("last_name"),
    #         avatar=request.data.get("avatar"),
    #         phone_number=request.data.get("phone_number")
    #     )
    #     password = request.data.get("password")
    #     final_user.set_password(password)
    #     json_user = {
    #         'username': final_user.username,
    #         'password': final_user.password,
    #         'first_name': final_user.first_name,
    #         'last_name': final_user.last_name,
    #         'avatar': final_user.avatar,
    #         'phone_number': final_user.phone_number
    #     }
    #     return Response(json_user)

class UpdateUserView(UpdateAPIView):
    queryset = user.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    # def update(self, request, *args, **kwargs):
    #     profile = self.get_object()
    #     serializer = self.get_serializer(profile, data=request.data, partial=True)
    #
    #     if serializer.is_valid():
    #         serializer.save()
