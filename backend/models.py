from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

# Create your models here.
from backend.managers import CustomUserManager


class CustomUser(AbstractUser):
    username = models.CharField(_('user name'), max_length=50, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    # full_name = models.CharField(_('full name'), max_length=50, unique=True)
    mobile_no = models.CharField(_('mobile number'), max_length=10, null=True)
    # date_of_birth = models.DateField(_("date of birth"), null=True, blank=True)
    creation_date = models.DateField(default=timezone.now)
    is_staff = models.BooleanField(default=True)

    # profile_pic = models.ImageField(upload_to='media', null=True, blank=True)
    # otp_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['mobile_no', 'username']

    objects = CustomUserManager()

    def __str__(self):
        return self.username

class Meter(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=120, unique=True)
    BUILDING_TYPE_CHOICES = [
        ('DOMESTIC', 'DOMESTIC'),
        ('AGRICULTURE', 'AGRICULTURE'),
        ('COMMERCIAL', 'COMMERCIAL'),
        ('INDUSTRIAL', 'INDUSTRIAL')
    ]
    building_type = models.CharField(max_length=120, choices=BUILDING_TYPE_CHOICES)
    cons_no = models.CharField(max_length=25, default=0, unique=True)
    location = models.TextField()

    def __str__(self):
        return self.name
    class Meta:
        db_table = "meter"
    
class MonthlyEbBill(models.Model):
    id = models.BigAutoField(primary_key=True)
    meter = models.ForeignKey(Meter, on_delete=models.CASCADE)
    month = models.DateField()
    previous_reading = models.FloatField()
    current_reading = models.FloatField()
    units_consumed = models.FloatField(null=True, blank=True)
    bill_amount = models.FloatField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.units_consumed = self.current_reading - self.previous_reading
        if self.units_consumed <= 100:
            self.bill_amount = 0.0
        elif self.units_consumed <= 200:
            self.bill_amount = (self.units_consumed - 100) * 2.25
        elif self.units_consumed <= 400:
            self.bill_amount = ((self.units_consumed - 200) * 4.50) + 225
        elif self.units_consumed <= 500:
            self.bill_amount = ((self.units_consumed - 400) * 6.0) + 1125
        elif self.units_consumed <= 600:
            self.bill_amount = ((self.units_consumed - 500) * 8.0) + 1950
        elif self.units_consumed <= 800:
            self.bill_amount = ((self.units_consumed - 600) * 9.0) + 2750
        elif self.units_consumed <= 1000:
            self.bill_amount = ((self.units_consumed - 800) * 10.0) + 4550
        else:
            self.bill_amount = ((self.units_consumed - 800) * 11.0) + 4350

        super(MonthlyEbBill, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.meter.user.username} - Amount \t{self.bill_amount}"

    class Meta:
        db_table = 'bill'
