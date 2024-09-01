from django.contrib import admin

from backend.models import CustomUser, MonthlyEbBill, Meter

# Register your models here.
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password', 'username')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_superuser')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

# admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(MonthlyEbBill)
admin.site.register(Meter)
