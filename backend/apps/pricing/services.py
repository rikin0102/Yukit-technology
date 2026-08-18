import logging
from django.core.mail import send_mail
from django.conf import settings
from pricing.models import PricingTier, PricingInquiry
from analytics.services import AnalyticsService
from analytics.models import AnalyticsEvent

logger = logging.getLogger(__name__)

class PricingService:
    @staticmethod
    def get_active_tiers():
        return PricingTier.objects.filter(is_active=True)

    @staticmethod
    def create_pricing_inquiry(validated_data, ip_address=None, user_agent=None):
        inquiry = PricingInquiry.objects.create(**validated_data)
        
        logger.info(f"New Pricing Inquiry created: ID {inquiry.id} for tier {inquiry.pricing_tier}")
        
        # Track in analytics
        AnalyticsService.record_event(
            event_type=AnalyticsEvent.INQUIRY_SUBMISSION,
            path='/api/pricing/',
            details={
                "pricing_inquiry_id": inquiry.id,
                "tier_name": inquiry.pricing_tier.name if inquiry.pricing_tier else "Custom",
                "estimated_budget": inquiry.estimated_budget,
                "company": inquiry.company
            },
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        # Send automated email notification to admin
        try:
            tier_name = inquiry.pricing_tier.name if inquiry.pricing_tier else "Custom / Calculator"
            subject = f"New Pricing Calculator Inquiry from {inquiry.name} ({tier_name}) - Yukti Technologies"
            
            # Format custom configurations nicely if any exist
            custom_details = ""
            if inquiry.custom_configuration:
                custom_details += "\n--- Custom Calculator Configuration ---\n"
                for key, val in inquiry.custom_configuration.items():
                    custom_details += f"{key}: {val}\n"
            
            message = (
                f"You have received a new pricing calculator inquiry from the website.\n\n"
                f"--- Details ---\n"
                f"Name: {inquiry.name}\n"
                f"Email: {inquiry.email}\n"
                f"Company: {inquiry.company or 'N/A'}\n"
                f"Selected Tier: {tier_name}\n"
                f"Estimated Budget: {inquiry.estimated_budget or 'N/A'}\n"
                f"{custom_details}\n"
                f"Requirements & Message:\n"
                f"{inquiry.requirements}\n"
            )
            recipient_list = ['rikinp0102@gmail.com']
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=recipient_list,
                fail_silently=False
            )
            logger.info(f"Email notification successfully sent for Pricing Inquiry ID {inquiry.id}")
        except Exception as e:
            logger.error(f"Failed to send email notification for Pricing Inquiry ID {inquiry.id}: {str(e)}")
            
        return inquiry
