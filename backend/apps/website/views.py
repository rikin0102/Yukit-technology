from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from website.models import Setting
from website.serializers import SettingSerializer
from website.services import WebsiteService
from common.permissions import IsEditorOrReadOnly, IsEditorUserRole

class SettingViewSet(viewsets.ModelViewSet):
    queryset = Setting.objects.all()
    serializer_class = SettingSerializer
    permission_classes = [IsEditorOrReadOnly]
    lookup_field = 'key'

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def public_dict(self, request):
        """
        Get all settings as a flat key-value dictionary.
        """
        settings_dict = WebsiteService.get_all_settings_dict()
        return Response({
            "status": "success",
            "settings": settings_dict
        })

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsEditorUserRole])
    def bulk_update(self, request):
        """
        Bulk update multiple settings at once.
        Format: {"settings": {"site_name": "New Name", "contact_email": "admin@test.com"}}
        """
        settings_data = request.data.get('settings', {})
        if not isinstance(settings_data, dict):
            return Response(
                {"status": "error", "code": "INVALID_FORMAT", "message": "Settings data must be a dictionary."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        updated_settings = []
        for key, value in settings_data.items():
            setting = WebsiteService.update_setting(key, str(value))
            updated_settings.append(setting)
            
        serializer = self.get_serializer(updated_settings, many=True)
        return Response({
            "status": "success",
            "message": f"Successfully updated {len(updated_settings)} settings.",
            "data": serializer.data
        })
