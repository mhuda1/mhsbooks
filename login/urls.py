from django.urls import path
from . import views
from django.contrib.auth.views import LoginView, LogoutView

app_name = "login"
urlpatterns = [
    path('register/', views.register, name="register"),
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(next_page='books:home'), name="logout"),
]
