import logging
from django.core.mail import send_mail
from django.conf import settings
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
        
        # Send automated email notification to admin
        try:
            subject = f"New Contact Inquiry from {inquiry.name} - Yukti Technologies"
            message = (
                f"You have received a new contact inquiry from the website.\n\n"
                f"--- Details ---\n"
                f"Name: {inquiry.name}\n"
                f"Email: {inquiry.email}\n"
                f"Company: {inquiry.company or 'N/A'}\n"
                f"Phone: {inquiry.phone or 'N/A'}\n"
                f"Status: {inquiry.status}\n\n"
                f"Message:\n"
                f"{inquiry.message}\n"
            )
            recipient_list = ['rikinp0102@gmail.com']
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=recipient_list,
                fail_silently=False
            )
            logger.info(f"Email notification successfully sent for Inquiry ID {inquiry.id}")
        except Exception as e:
            logger.error(f"Failed to send email notification for Inquiry ID {inquiry.id}: {str(e)}")
        
        return inquiry
