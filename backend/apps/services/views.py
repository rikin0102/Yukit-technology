from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from services.models import Service
from services.serializers import ServiceSerializer
from services.services import ServiceManagerService
from common.permissions import IsEditorOrReadOnly, IsEditorUserRole

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsEditorOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        # Authenticated editors/admins can see all services, normal users see active only
        user = self.request.user
        if user and user.is_authenticated and user.is_editor:
            return Service.objects.all().prefetch_related('features')
        return ServiceManagerService.get_active_services()

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsEditorUserRole])
    def toggle_status(self, request, slug=None):
        service = self.get_object()
        updated_service = ServiceManagerService.toggle_service_status(service.id)
        if updated_service:
            return Response({
                "status": "success",
                "message": f"Service active status toggled to {updated_service.is_active}.",
                "is_active": updated_service.is_active
            })
        return Response(
            {"status": "error", "code": "NOT_FOUND", "message": "Service not found"},
            status=status.HTTP_404_NOT_FOUND
        )
