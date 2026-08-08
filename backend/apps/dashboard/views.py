from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from dashboard.services import DashboardService
from common.permissions import IsEditorUserRole

class DashboardMetricsView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsEditorUserRole]

    def get(self, request):
        """
        Aggregate all metrics for custom Next.js admin dashboard.
        """
        metrics = DashboardService.get_summary_metrics()
        trends = DashboardService.get_inquiry_trends()
        traffic_30d = DashboardService.get_traffic_trends_30d()
        activity_logs = DashboardService.get_activity_logs(limit=25)
        
        return Response({
            "status": "success",
            "data": {
                "summary": metrics,
                "inquiry_trends": trends,
                "traffic_trends_30d": traffic_30d,
                "activity_logs": activity_logs
            }
        })
