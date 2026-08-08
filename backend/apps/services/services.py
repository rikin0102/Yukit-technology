from services.models import Service, ServiceFeature
from django.db import transaction

class ServiceManagerService:
    @staticmethod
    def get_active_services():
        return Service.objects.filter(is_active=True).prefetch_related('features')

    @staticmethod
    @transaction.atomic
    def create_service(service_data, features_data):
        service = Service.objects.create(**service_data)
        for feature in features_data:
            ServiceFeature.objects.create(service=service, **feature)
        return service

    @staticmethod
    def toggle_service_status(service_id):
        try:
            service = Service.objects.get(id=service_id)
            service.is_active = not service.is_active
            service.save()
            return service
        except Service.DoesNotExist:
            return None
