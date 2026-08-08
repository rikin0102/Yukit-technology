from django.utils import timezone
from datetime import timedelta
from django.db.models import Count
from django.db.models.functions import TruncMonth, TruncDay
from inquiries.models import Inquiry
from pricing.models import PricingInquiry, PricingTier
from projects.models import Project
from services.models import Service
from media.models import MediaFile
from analytics.models import AnalyticsEvent

class DashboardService:
    @staticmethod
    def get_summary_metrics():
        """
        Gathers core database count metrics for dashboard cards.
        """
        # Date ranges
        now = timezone.now()
        thirty_days_ago = now - timedelta(days=30)
        
        # Core counts
        total_projects = Project.objects.count()
        total_services = Service.objects.count()
        total_media = MediaFile.objects.count()
        
        # Inquiry metrics
        contact_inquiries_total = Inquiry.objects.count()
        contact_inquiries_new = Inquiry.objects.filter(status=Inquiry.NEW).count()
        
        pricing_inquiries_total = PricingInquiry.objects.count()
        
        # Analytics traffic
        total_pageviews_30d = AnalyticsEvent.objects.filter(
            event_type=AnalyticsEvent.PAGEVIEW,
            created_at__gte=thirty_days_ago
        ).count()
        
        unique_visitors_30d = AnalyticsEvent.objects.filter(
            event_type=AnalyticsEvent.PAGEVIEW,
            created_at__gte=thirty_days_ago
        ).values('ip_hash').distinct().count()

        # Gather status breakout
        inquiry_status_breakout = dict(
            Inquiry.objects.values_list('status').annotate(count=Count('id'))
        )

        return {
            "counts": {
                "projects": total_projects,
                "services": total_services,
                "media": total_media,
                "contact_inquiries": {
                    "total": contact_inquiries_total,
                    "new": contact_inquiries_new,
                },
                "pricing_inquiries": {
                    "total": pricing_inquiries_total,
                }
            },
            "traffic": {
                "pageviews_30d": total_pageviews_30d,
                "unique_visitors_30d": unique_visitors_30d
            },
            "status_breakout": inquiry_status_breakout
        }

    @staticmethod
    def get_inquiry_trends():
        """
        Aggregates inquiries month-by-month for past 6 months.
        """
        six_months_ago = timezone.now() - timedelta(days=180)
        
        contacts = Inquiry.objects.filter(created_at__gte=six_months_ago) \
            .annotate(month=TruncMonth('created_at')) \
            .values('month') \
            .annotate(count=Count('id')) \
            .order_by('month')
            
        pricing = PricingInquiry.objects.filter(created_at__gte=six_months_ago) \
            .annotate(month=TruncMonth('created_at')) \
            .values('month') \
            .annotate(count=Count('id')) \
            .order_by('month')
            
        # Combine trends
        trend_dict = {}
        for item in contacts:
            m_str = item['month'].strftime('%Y-%m')
            trend_dict[m_str] = {"month": m_str, "contact": item['count'], "pricing": 0}
            
        for item in pricing:
            m_str = item['month'].strftime('%Y-%m')
            if m_str in trend_dict:
                trend_dict[m_str]["pricing"] = item['count']
            else:
                trend_dict[m_str] = {"month": m_str, "contact": 0, "pricing": item['count']}
                
        return sorted(trend_dict.values(), key=lambda x: x['month'])

    @staticmethod
    def get_traffic_trends_30d():
        """
        Daily pageview traffic trend for the past 30 days.
        """
        thirty_days_ago = timezone.now() - timedelta(days=30)
        views = AnalyticsEvent.objects.filter(
            event_type=AnalyticsEvent.PAGEVIEW,
            created_at__gte=thirty_days_ago
        ).annotate(day=TruncDay('created_at')) \
         .values('day') \
         .annotate(count=Count('id')) \
         .order_by('day')
         
        return [
            {"date": item['day'].strftime('%Y-%m-%d'), "views": item['count']} 
            for item in views
        ]

    @staticmethod
    def get_activity_logs(limit=30):
        """
        Gets recent analytics events as a log feed.
        """
        events = AnalyticsEvent.objects.all().order_by('-created_at')[:limit]
        logs = []
        for event in events:
            logs.append({
                "id": event.id,
                "event_type": event.event_type,
                "event_type_display": event.get_event_type_display(),
                "path": event.path,
                "details": event.details,
                "created_at": event.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                "user_agent_short": event.user_agent[:60] + "..." if event.user_agent else None
            })
        return logs
