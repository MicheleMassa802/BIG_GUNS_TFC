from django.contrib import admin
from django.urls import path
from studios.views import StudioView, AllStudiosView, FilterStudioView

app_name = "studios"

urlpatterns = [
    path('<int:lat>/<int:long>/all/', AllStudiosView.as_view()),
    path('<int:pk>/details/', StudioView.as_view()),
    path('find_studio/', FilterStudioView.as_view()),
]
