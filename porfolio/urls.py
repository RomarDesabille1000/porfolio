from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from porfolio import settings

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('admin/', admin.site.urls),
    path('api/blog/', include('blogs.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
