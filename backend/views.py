# from django.core.cache import cache
# from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
# from django.contrib.auth.decorators import login_required
# from django.db.models import Sum
# from django.http import JsonResponse, HttpResponse
# from django.shortcuts import render, redirect, get_object_or_404
# from django.views.decorators.http import require_http_methods
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib import messages
# import json
# from twilio.rest import Client
# from django.conf import settings
# import random

# from backend.models import MonthlyEbBill, CustomUser
# from datetime import datetime, timedelta, date


# def perform_logout(request):
#     logout(request)
#     return redirect('/home')


# def send_otp(request, phone_number):
#     #     # Generate a random 6-digit OTP
#     otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
#     request.session['otp'] = otp  # Store OTP in session
#     # Send OTP using Twilio
#     client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
#     message = client.messages.create(
#         body=f'Your TNEbBCALC OTP is: {otp}This OTP is valid only for 30 seconds. do not share your OTP',
#         from_='+16403004783',
#         to='+91' + phone_number
#     )
#     cache_key = f'otp_{request.session.session_key}'
#     cache.set(cache_key, otp, timeout=60)
#     #
#     return otp


# def verify_otp(request):
#     if not request.session.get('otp_verification_in_progress', False):
#         return redirect('/login')
#     if request.method == 'POST':
#         entered_otp = request.POST.get('entered_otp')
#         cache_key = f'otp_{request.session.session_key}'
#         saved_otp = cache.get(cache_key)
#         if entered_otp == saved_otp:

#             # OTP is valid, authenticate the user
#             phone_number = request.session.get('phone_number')

#             user = CustomUser.objects.get(mobile_no=phone_number)
#             user.otp_verified = True
#             user.save()
#             # Your authentication logic here
#             cache.delete(cache_key)
#             del request.session['otp_verification_in_progress']
#             return redirect('/dashboard')
#         else:
#             # Invalid OTP, show an error message
#             return render(request, 'frontend/verify_otp.html', {'error': 'Invalid OTP'})
#     return render(request, 'frontend/verify_otp.html')


# # def page_redirect():
# #     time.sleep(10)
# #     redirect('/verify_otp')
# def user_login(request):
#     if request.method == "POST":
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             if user.is_superuser:
#                 login(request, user)
#                 return redirect('/dashboard')
#             else:
#                 # Check whether the user is verified using OTP
#                 if not user.otp_verified:
#                     messages.error(request, "Please verify your account to login!")
#                     # request.session['username'] = user.username
#                     request.session['phone_number'] = user.mobile_no
#                     request.session['otp_verification_in_progress'] = True
#                     send_otp(request, user.mobile_no)

#                     return render(request, "frontend/login.html", {"otp_sent": True})
#                 else:
#                     login(request, user)
#                     return redirect('/dashboard')



#         else:
#             messages.error(request, "Invalid Credentials or User Not Found")
#             return render(request, "frontend/login.html")
#     return render(request, "frontend/login.html")


# def user_registration(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         full_name = request.POST.get('full_name')
#         phone_no = request.POST.get('phone_no')
#         email = request.POST.get('email')
#         password = request.POST.get('password')
#         confirm_password = request.POST.get('confirm_password')

#         if password == confirm_password:
#             if CustomUser.objects.filter(username=username, email=email, mobile_no=phone_no).exists():
#                 return HttpResponse("User with given details already available")

#             if phone_no:
#                 send_otp(request, phone_no)

#             user = CustomUser.objects.create_user(username=username, email=email, mobile_no=phone_no,
#                                                   full_name=full_name, password=password)
#             request.session['otp_verification_in_progress'] = True
#             return redirect('/verify_otp')

#             # our_user = authenticate(username=username, password=password)
#             # if our_user is not None:
#             #     login(request, user)
#             #     return redirect('/dashboard')
#         else:
#             print("Passwords do not match")
#             return redirect('/user_signup')

#     return render(request, "frontend/registration.html")


# def index(request):
#     return render(request, "frontend/index.html")


# @login_required(login_url='/login')
# def dashboard(request):
#     today = datetime.today()
#     last_four_months = [(today - timedelta(days=30 * i)).strftime('%B') for i in range(4)]

#     bills = MonthlyEbBill.objects.filter(name=request.user).order_by('-month')[:4]
#     labels = [data.month.strftime('%B %Y') for data in bills]

#     chart_data = {
#         'labels': labels,
#         'bill_amounts': [data.bill_amount for data in bills],
#         'units_consumed': [data.units_consumed for data in bills],
#     }

#     units_bill_data = {
#         'labels': labels,
#         'units': [data.units_consumed for data in bills],
#         'bills': [data.bill_amount for data in bills],
#     }

#     context = {
#         "bills": bills,
#         "last_four_months": last_four_months,
#         "total": MonthlyEbBill.objects.filter(name=request.user.id).count,
#         "total_units": bills.aggregate(total=Sum('units_consumed'))['total'] or 0,
#         "total_bill_amount": bills.aggregate(total=Sum('bill_amount'))['total'] or 0,
#         "chart_data_json": json.dumps(chart_data),  # Convert chart_data to JSON string
#         "units_bill_data_json": json.dumps(units_bill_data),  # Convert units_bill_data to JSON string
#     }

#     return render(request, "backend/dashboard.html", context)


# @csrf_exempt
# def add_invoice(request):
#     if request.method == "POST":
#         name_id = int(request.POST.get('name_id'))
#         month = request.POST.get('month')
#         previous_reading = float(request.POST.get('previous_reading'))
#         current_reading = float(request.POST.get('current_reading'))
#         print(month)

#         if name_id is not None and month is not None and previous_reading is not None and current_reading is not None:
#             try:
#                 name = CustomUser.objects.get(id=name_id)  # Assuming CustomUser is your user model
#                 monthly_bill = MonthlyEbBill(
#                     name=name,
#                     month=month,
#                     previous_reading=previous_reading,
#                     current_reading=current_reading
#                 )
#                 monthly_bill.save()

#                 return redirect('/dashboard')
#             except CustomUser.DoesNotExist:
#                 return HttpResponse("User not found.", status=400)
#             except Exception as e:
#                 return HttpResponse(f"An error occurred: {str(e)}", status=500)
#         else:
#             return HttpResponse("Required data is missing.", status=400)

#     context = {
#         "current_date": date.today(),
#         "latest_record": MonthlyEbBill.objects.filter(name=request.user).order_by('-month').first()
#     }

#     return render(request, "backend/new_invoice.html", context)


# @require_http_methods(["DELETE"])
# def delete_invoice(request, pk):
#     invoice = get_object_or_404(MonthlyEbBill, pk=pk)
#     invoice.delete()
#     return JsonResponse({'success': True})


# @login_required
# def update_profile(request):
#     if request.method == 'POST':
#         user_name = request.POST.get('username')
#         full_name = request.POST.get('full_name')
#         phone_no = request.POST.get('phone_no')
#         cons_no = request.POST.get('cons_no')
#         date_of_birth = request.POST.get('date_of_birth')
#         profile_pic = request.FILES.get('profile_pic')  # This is how you get the uploaded file

#         # Update the user's information
#         user = request.user
#         if user_name:
#             user.username = user_name
#         if full_name:
#             user.full_name = full_name
#         if phone_no:
#             user.mobile_no = phone_no
#         if cons_no:
#             user.cons_no = cons_no
#         if date_of_birth:
#             user.date_of_birth = date_of_birth
#         if profile_pic:
#             user.profile_pic = profile_pic
#         user.save()

#         return redirect('/dashboard')  # Redirect to the user's profile page

#     return render(request, 'backend/update_profile.html')


# @login_required
# def detail_invoice(request, pk):
#     invoice = get_object_or_404(MonthlyEbBill, pk=pk)
#     return render(request, "backend/detail_invoice.html", {"invoice": invoice})


# @login_required
# def change_password(request):
#     if request.method == 'POST':
#         current_password = request.POST.get('password')
#         new_password = request.POST.get('newpassword')
#         confirm_new_password = request.POST.get('confirmpassword')

#         if request.user.check_password(current_password):
#             if new_password == confirm_new_password:
#                 request.user.set_password(new_password)
#                 request.user.save()
#                 messages.success(request, 'Password changed successfully.')

#                 update_session_auth_hash(request, request.user)  # Important to update the session

#                 return redirect('/dashboard')
#             else:
#                 messages.error(request, 'New password and confirm password do not match.')

#         else:
#             messages.error(request, 'Current password is incorrect.')
#     return render(request, "backend/change_password.html")


# def resend_otp(request):
#     if request.method == "POST":
#         phone_number = request.session.get('phone_number')
#         if phone_number:
#             send_otp(request, phone_number)
#             request.session['otp_verification_in_progress'] = True
#             messages.success(request, "OTP has been resent successfully.")
#             return redirect('verify_otp')
#     return redirect('/login')

from rest_framework import  viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from django.db.models.signals import post_save
from django.contrib.auth import authenticate, login, logout
from django.dispatch import receiver
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import CustomUser, Meter, MonthlyEbBill
from .serializers import UserSerializer, MetersSerializer, BillSerializer, LoginSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def get_queryset(self):
        # Return only the data of the currently logged-in user
        return CustomUser.objects.filter(id=self.request.user.id)

class MeterViewSet(viewsets.ModelViewSet):
    queryset = Meter.objects.all()
    serializer_class = MetersSerializer
    permission_classes = [IsAuthenticated]    
    def get_queryset(self):
        # return Meter.objects.all()
        return Meter.objects.filter(user=self.request.user)
    

class BillViewSet(viewsets.ModelViewSet):
    queryset = MonthlyEbBill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [IsAuthenticated]


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# @csrf_exempt


class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutAPIView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    def post(self, request, *args, **kwargs):
        # Extract token from the Authorization header
        token = request.headers.get('Authorization')
        print(token)

        if token:
            token = token.replace('Token ', '')  # Remove 'Token ' prefix
            try:
                token_obj = Token.objects.get(key=token)
                token_obj.delete()  # Delete the token to log out the user
                return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
            except Token.DoesNotExist:
                return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Token not provided."}, status=status.HTTP_400_BAD_REQUEST)