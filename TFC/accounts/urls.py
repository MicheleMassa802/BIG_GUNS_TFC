from django.contrib import admin
from django.urls import path
from accounts.views import CreateUserView, UpdateUserView, GetUser, GetProfile
from rest_framework_simplejwt import views as jwt_views

app_name = "accounts"

urlpatterns = [
    path('user/', GetUser.as_view()),
    path('register/', CreateUserView.as_view()),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('<int:pk>/update/', UpdateUserView.as_view()),
    path('<int:pk>/profile/', GetProfile.as_view())
]
