from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from Classes.views import ShowStudioClassesView, ShowUserClassesHistory, EnrollUserToClasses, FilterStudioClassView, \
    DropUserFromClasses

from rest_framework_simplejwt.views import TokenObtainPairView

app_name = "Classes"

urlpatterns = [
    path('<str:studio_name>/', ShowStudioClassesView.as_view(), name='studio-classes'),
    path('user/<int:user_id>/', ShowUserClassesHistory.as_view(), name='user-classes'),
    path('user/enroll/<int:user_id>/', EnrollUserToClasses.as_view(), name='user-classes'),
    path('user/drop/<int:user_id>/', DropUserFromClasses.as_view(), name='drop-classes'),
    path('<int:studio_id>/find_class/', FilterStudioClassView.as_view()),

    # used to generate token (vid 4 1:32:00), to then access django api at
    # 8000/Subscriptions/<user_id>/update_subscription/edit/
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]