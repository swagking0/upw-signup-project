from django.urls import path
from . import views

urlpatterns = [
    path('',views.root,name='root'),
    path('manage/',views.manage,name='manage'),
    path('home/',views.home,name='home'),
    path('signup/',views.signup,name='signup'),
    path('forgot_password/',views.forgot_password,name='forgot_password'),
    path('login/',views.login,name='login'),
    path('logout/',views.logout,name='logout'),
]
