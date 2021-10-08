import os
from datetime import datetime
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.contrib.auth.hashers import make_password
from django.dispatch import receiver


class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    def profile_path(self, filename):
        file_type = filename.split(".")[-1]
        f = str(self.email) + '_' + str(self.name) + '.' + file_type
        return '/'.join(['images/', 'profile/', f])

    email = models.EmailField(max_length=255, unique=True, null=False, blank=False)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    profile_image = models.ImageField(upload_to=profile_path, blank=True, null=True)
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

# Senders
@receiver(models.signals.post_delete, sender=UserAccount)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `MediaFile` object is deleted.
    """
    if instance.profile_image:
        if os.path.isfile(instance.profile_image.path):
            os.remove(instance.profile_image.path)

@receiver(models.signals.pre_save, sender=UserAccount)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `MediaFile` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = UserAccount.objects.get(pk=instance.pk).profile_image
        if not old_file:
            return False
    except UserAccount.DoesNotExist:
        return False

    new_file = instance.profile_image
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)
