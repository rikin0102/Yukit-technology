from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from media.models import MediaFile
from media.serializers import MediaFileSerializer
from media.services import MediaService
from common.permissions import IsEditorUserRole

class MediaFileViewSet(viewsets.ModelViewSet):
    queryset = MediaFile.objects.all().order_by('-created_at')
    serializer_class = MediaFileSerializer
    parser_classes = (MultiPartParser, FormParser)
    
    def get_permissions(self):
        if self.action in ['create', 'destroy', 'update', 'partial_update']:
            # Require EDITOR role or admin
            self.permission_classes = [permissions.IsAuthenticated, IsEditorUserRole]
        else:
            # Let authenticated users view it (or anyone if viewing public project/services media, but let's restrict admin media list to auth users)
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response(
                {"status": "error", "code": "MISSING_FILE", "message": "No file uploaded."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        media_instance = MediaService.upload_and_optimize(file_obj)
        serializer = self.get_serializer(media_instance)
        
        return Response(
            {
                "status": "success",
                "message": "File uploaded and optimized successfully.",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )
