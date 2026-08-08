import logging
from inquiries.models import Inquiry
from analytics.services import AnalyticsService
from analytics.models import AnalyticsEvent

logger = logging.getLogger(__name__)

class InquiryService:
    @staticmethod
    def create_inquiry(validated_data, ip_address=None, user_agent=None):
        # Create DB record
        inquiry = Inquiry.objects.create(**validated_data)
        
        # Log inquiry event
        logger.info(f"New Inquiry created: ID {inquiry.id} from {inquiry.email}")
        
        # Trigger analytics log
        AnalyticsService.record_event(
            event_type=AnalyticsEvent.INQUIRY_SUBMISSION,
            path='/api/contact/',
            details={
                "inquiry_id": inquiry.id,
                "email": inquiry.email,
                "company": inquiry.company
            },
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        # Send automated email notification (mock log output in service layer)
        logger.info(f"Mock email notification sent to admins for Inquiry ID {inquiry.id}")
        
        return inquiry
