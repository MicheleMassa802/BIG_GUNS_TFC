from django.contrib import admin
from django.urls import path
from studios.views import StudioView, FilterStudioView

app_name = "studios"

urlpatterns = [
    path('<int:lat>/<int:long>/all/', FilterStudioView.as_view()),
    path('<str:studio>/details/', StudioView.as_view()),
    # path('find_studio/', FilterStudioView.as_view()),
]
