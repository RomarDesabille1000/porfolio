from django.urls import path
from .views import *

urlpatterns = [
    # post
    path('post/lists/', post_list),
    path('post/create/', post_create),
    path('post/delete/<slug>/', post_delete),
    path('post/update/<slug>/', post_update),
    path('post/search/<title>/', post_search),
    path('testupload/create', testupload_create),
    # category
    path('category/lists/', category_list),
    path('category/create', category_create),
]
