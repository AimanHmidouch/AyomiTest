from django.shortcuts import render

# Create your views here.

from rest_framework.parsers import JSONParser
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth.models import User


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


@api_view(["GET"])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET", "PUT"])
def userDetail(request, pk):
    try:
        user = User.objects.get(username=pk)
        print(user)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        # TODO: email = request.GET.get("email")
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    elif request.method == "PUT":
        updated_data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=updated_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(serializer.data)
