from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import *


# Post
@api_view(['POST', ])
def testupload_create(request):
    # json structure { "category_ids" : [3,4], "title:"... post attributes+
    serializer = TestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', ])
def post_search(request, title):
    post = Post.objects.filter(title__contains=title, status=1)
    serializer = PostSerializer(instance=post, many=True)
    return Response(serializer.data)

@api_view(['GET'], )
def post_list(request, page_items):
    page_size = page_items
    paginator = PageNumberPagination()
    paginator.page_size = page_size
    post = Post.objects.all()
    result_page = paginator.paginate_queryset(post, request)
    serializer = PostSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST', ])
def post_create(request):
    # json structure { "category_ids" : [3,4], "title:"... post attributes+
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', ])
def post_update(request, slug):
    post = Post.objects.get(slug=slug)
    serializer = PostSerializer(post, data=request.data)
    data = {}
    if serializer.is_valid():
        serializer.save()
        data['success'] = "Post has has been updated successfully."
        return Response(data=data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', ])
def post_delete(request, slug):
    post = Post.objects.get(slug=slug)
    operation = post.delete()
    data = {}
    if operation:
        data['success'] = "Post has been deleted sucessfully."
    else:
        data['failed'] = "Delete Failed."
    return Response(data=data)


# Category
@api_view(['GET', ])
@permission_classes([IsAuthenticated])
def category_list(request, page_size):
    categories = Category.objects.filter(user=request.user.id)
    paginator = PageNumberPagination()
    paginator.page_size = page_size
    result_page = paginator.paginate_queryset(categories, request)
    serializer = CategorySerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['POST', ])
def category_create(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', ])
def category_update(request, id):
    category = Category.objects.get(pk=id)
    serializer = CategorySerializer(category, data=request.data)
    data = {}
    if serializer.is_valid():
        serializer.save()
        data['success'] = "Category has been updated successfully."
        return Response(data=data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', ])
@permission_classes([IsAuthenticated])
def category_delete(request, id, page_size):
    try:
        category = Category.objects.get(pk=id, user=request.user.id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    operation = category.delete()
    if operation:
        categories = Category.objects.filter(user=request.user.id)
        paginator = PageNumberPagination()
        paginator.page_size = page_size
        result_page = paginator.paginate_queryset(categories, request)
        serializer = CategorySerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

