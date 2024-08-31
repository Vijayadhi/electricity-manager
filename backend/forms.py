from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from backend.models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    model = CustomUser
    fields = '__all__'

class CustomUserChangeForm(UserChangeForm):
    model = CustomUser
    fields = '__all__'