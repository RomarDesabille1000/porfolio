from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import *
User = get_user_model()


@api_view(['POST', ])
def is_email_exist(request):
    if User.objects.filter(email=request['email']).exists():
        return Response({'emailExist': True})

    return Response({'emailExist': False})

@api_view(['GET', ])
@permission_classes([IsAuthenticated])
def user_data(request):
    user = User.objects.get(email=request.user.email)
    print(user)
    serializer = UserAccountSerializer(user, many=False)
    return Response(serializer.data)
