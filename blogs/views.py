from rest_framework import status
from rest_framework.decorators import api_view
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

@api_view(['GET', ])
def post_list(request):
    post = Post.objects.all()
    serializer = PostSerializer(instance=post, many=True)
    return Response(serializer.data)


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
def category_list(request):
    category = Category.objects.all()
    serializer = CategorySerializer(instance=category, many=True)
    return Response(serializer.data)


@api_view(['POST', ])
def category_create(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', ])
def post_update(request, id):
    category = Category.objects.get(pk=id)
    serializer = CategorySerializer(category, data=request.data)
    data = {}
    if serializer.is_valid():
        serializer.save()
        data['success'] = "Category has been updated successfully."
        return Response(data=data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', ])
def post_delete(request, id):
    category = Category.objects.get(pk=id)
    operation = category.delete()
    data = {}
    if operation:
        data['success'] = "Category has been deleted sucessfully."
    else:
        data['failed'] = "Delete Failed."
    return Response(data=data)
