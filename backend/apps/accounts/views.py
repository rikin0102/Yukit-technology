from rest_framework import viewsets, status, generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.core.exceptions import PermissionDenied

from accounts.serializers import (
    UserSerializer, 
    RegisterSerializer, 
    CustomTokenObtainPairSerializer
)
from accounts.services import UserService
from common.permissions import IsAdminUserRole

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = UserService.register_user(serializer.validated_data)
        return Response(
            {
                "status": "success",
                "message": "User registered successfully.",
                "user": UserSerializer(user).data
            },
            status=status.HTTP_201_CREATED
        )

class UserProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({
            "status": "success",
            "user": serializer.data
        })

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            "status": "success",
            "message": "Profile updated successfully.",
            "user": serializer.data
        })

class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Admin to manage users.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsAdminUserRole)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        # Capture role change and handle via service layer if role changes
        new_role = request.data.get('role')
        if new_role and new_role != instance.role:
            try:
                UserService.update_user_role(request.user, instance, new_role)
            except (PermissionDenied, ValueError) as e:
                return Response(
                    {"status": "error", "code": "ROLE_UPDATE_FAILED", "message": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Save remaining fields
        serializer.save()
        return Response({
            "status": "success",
            "message": "User updated successfully.",
            "user": serializer.data
        })
