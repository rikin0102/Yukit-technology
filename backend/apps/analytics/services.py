from analytics.models import AnalyticsEvent
import hashlib

class AnalyticsService:
    @staticmethod
    def hash_ip(ip_address):
        if not ip_address:
            return None
        return hashlib.sha256(ip_address.encode('utf-8')).hexdigest()

    @classmethod
    def record_event(cls, event_type, path=None, details=None, ip_address=None, user_agent=None):
        """
        Record a new analytics event inside the database.
        """
        ip_hash = cls.hash_ip(ip_address)
        event = AnalyticsEvent.objects.create(
            event_type=event_type,
            path=path,
            details=details or {},
            ip_hash=ip_hash,
            user_agent=user_agent
        )
        return event
