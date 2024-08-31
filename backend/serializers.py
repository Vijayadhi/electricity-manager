from rest_framework import serializers
from .models import CustomUser, MonthlyEbBill, Meter

class UserSerializer(serializers.ModelSerializer):
    class Meta:     
        model = CustomUser
        fields = ['email', 'username', 'id', 'mobile_no']

class MetersSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)  # Add this line
    class Meta:
        model = Meter
        fields = ['id', 'user', 'name', 'building_type', 'cons_no', 'location', 'username']

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyEbBill
        fields = ['id', 'meter', 'month', 'previous_reading', 'current_reading', 'units_consumed', 'bill_amount']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)


