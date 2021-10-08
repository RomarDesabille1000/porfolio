from django.contrib import admin
from django.forms import forms

from .models import *

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    fields = ('title', 'user')
    list_display = ('id', 'title', 'user', )


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'created_on')
    list_display_links = ('title', 'created_on')
    list_filter = ('title', )
    search_fields = ('title', )
    list_per_page = 25


admin.site.register(Post, PostAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(TestUpload)

