from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from pricing.models import PricingTier, PricingInquiry
from pricing.serializers import PricingTierSerializer, PricingInquirySerializer
from pricing.services import PricingService
from common.permissions import IsEditorOrReadOnly, IsEditorUserRole

class PricingTierViewSet(viewsets.ModelViewSet):
    queryset = PricingTier.objects.all()
    serializer_class = PricingTierSerializer
    permission_classes = [IsEditorOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        user = self.request.user
        if user and user.is_authenticated and user.is_editor:
            return PricingTier.objects.all()
        return PricingService.get_active_tiers()

class PricingInquiryViewSet(viewsets.ModelViewSet):
    queryset = PricingInquiry.objects.all().order_by('-created_at')
    serializer_class = PricingInquirySerializer

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAuthenticated, IsEditorUserRole]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        ip_address = request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT')
        
        inquiry = PricingService.create_pricing_inquiry(
            serializer.validated_data,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "status": "success",
                "message": "Your request for quote has been submitted successfully.",
                "data": PricingInquirySerializer(inquiry).data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )
