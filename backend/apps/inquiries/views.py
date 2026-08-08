from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from inquiries.models import Inquiry
from inquiries.serializers import InquirySerializer
from inquiries.services import InquiryService
from common.permissions import IsEditorUserRole

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAuthenticated, IsEditorUserRole]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Get client IP and User Agent
        ip_address = request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT')
        
        inquiry = InquiryService.create_inquiry(
            serializer.validated_data, 
            ip_address=ip_address, 
            user_agent=user_agent
        )
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "status": "success",
                "message": "Your inquiry has been submitted successfully.",
                "data": InquirySerializer(inquiry).data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )
