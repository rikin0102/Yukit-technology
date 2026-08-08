from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from analytics.services import AnalyticsService
from analytics.models import AnalyticsEvent

class PageViewLoggingView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        path = request.data.get('path')
        if not path:
            return Response(
                {"status": "error", "code": "MISSING_PATH", "message": "Path is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        ip_address = request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT')
        
        AnalyticsService.record_event(
            event_type=AnalyticsEvent.PAGEVIEW,
            path=path,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        return Response(
            {"status": "success", "message": "Pageview recorded successfully."},
            status=status.HTTP_201_CREATED
        )
