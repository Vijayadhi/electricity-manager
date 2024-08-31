# from django.urls import path

# from backend.views import index, dashboard, user_login, perform_logout, delete_invoice, add_invoice, user_registration, \
#     update_profile, detail_invoice, change_password, verify_otp, resend_otp

# urlpatterns = [
#     # path('/', index),
#     path('home', index),
#     path('login', user_login),
#     path('logout', perform_logout),
#     path('dashboard', dashboard),
#     path('add_invoice', add_invoice),
#     path('<int:pk>/delete_invoice', delete_invoice),
#     path('create_user', user_registration),
#     path('update_profile', update_profile),
#     path('<int:pk>/detail_invoice', detail_invoice),
#     path('change_password', change_password),
#     path('verify_otp', verify_otp, name='verify_otp'),
#     path('resend_otp', resend_otp, name='resend_otp'),
# ]
from django.urls import include, path
from rest_framework import routers

from .views import UserViewSet, MeterViewSet, BillViewSet, LoginAPIView, LogoutAPIView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
# router.register(r'login', LoginAPIView)
router.register(r'meter', MeterViewSet, basename='meter')
router.register(r'bills', BillViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', LoginAPIView.as_view(), name='login'),
    path('api/logout/', LogoutAPIView.as_view(), name='logout'),
]