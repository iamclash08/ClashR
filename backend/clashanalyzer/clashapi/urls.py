# from django.urls import path
# from . import views

# urlpatterns = [
#     path("players/<str:tag>/", views.player_detail, name="player_detail"),
#     path("players/<str:tag>/battlelog/", views.player_battlelog, name="player_battlelog"),
# ]
from django.urls import path
from . import views

urlpatterns = [
    path("players/<str:tag>/", views.player_profile, name="player-profile"),
]
