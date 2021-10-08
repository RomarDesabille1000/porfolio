import os

from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
import datetime

from django.dispatch import receiver

from django.contrib.auth import get_user_model
User = get_user_model()


class Post(models.Model):
    def posts_path(self, filename):
        file_type = filename.split(".")[-1]
        f = str(datetime.datetime.now()) + '.' + file_type
        return '/'.join(['images/', 'posts/', f])

    STATUS = (
        (0, "Draft"),
        (1, "Publish")
    )
    title = models.CharField(max_length=200, blank=False, null=False)
    slug = models.CharField(max_length=500, blank=False, null=False, unique=True)
    body = RichTextUploadingField(blank=True, null=True)
    category = models.ManyToManyField('Category')
    thumbnail = models.ImageField(upload_to=posts_path, blank=True, null=True)
    status = models.IntegerField(choices=STATUS, default=0)
    updated_on = models.DateTimeField(auto_now_add=True)
    created_on = models.DateField(auto_now_add=True)
    is_featured_project = models.BooleanField(default=False)
    is_featured_post = models.BooleanField(default=False)


    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.title

class Category(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.title

class TestUpload(models.Model):
    def image(self, filename):
        return '/'.join(['images', 'uploads', filename])

    image = models.ImageField(upload_to=image, blank=True, null=True)

    def __str__(self):
        return self.image.name

# Senders
@receiver(models.signals.post_delete, sender=Post)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `MediaFile` object is deleted.
    """
    if instance.thumbnail:
        if os.path.isfile(instance.thumbnail.path):
            os.remove(instance.thumbnail.path)

@receiver(models.signals.pre_save, sender=Post)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `MediaFile` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = Post.objects.get(pk=instance.pk).thumbnail
    except Post.DoesNotExist:
        return False

    new_file = instance.thumbnail
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)