from django.db import models
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField

class Post(models.Model):
    def thumbnail_name(self, filename):
        return '/'.join(['images', str(self.slug), filename])

    STATUS = (
        (0, "Draft"),
        (1, "Publish")
    )
    title = models.CharField(max_length=200, blank=False, null=False)
    slug = models.CharField(max_length=500, blank=False, null=False, unique=True)
    body = RichTextUploadingField(blank=True, null=True)
    category = models.ManyToManyField('Category')
    thumbnail = models.ImageField(upload_to=thumbnail_name, blank=True, null=True)
    status = models.IntegerField(choices=STATUS, default=0)
    updated_on = models.DateTimeField(auto_now_add=True)
    created_on = models.DateField(auto_now_add=True)
    is_featured_project = models.BooleanField(default=False)
    is_featured_post = models.BooleanField(default=False)


    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title

class Category(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.title

class TestUpload(models.Model):
    def image(self, filename):
        return '/'.join(['images', 'uploads', filename])

    image = models.ImageField(upload_to=image, blank=True, null=True)

    def __str__(self):
        return self.image.name



