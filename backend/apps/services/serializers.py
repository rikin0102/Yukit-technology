from rest_framework import serializers
from services.models import Service, ServiceFeature

class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ('id', 'title', 'description')

class ServiceSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, required=False)

    class Meta:
        model = Service
        fields = ('id', 'title', 'slug', 'short_description', 'full_content', 'icon_identifier', 'order', 'is_active', 'features', 'created_at')

    def create(self, validated_data):
        features_data = validated_data.pop('features', [])
        service = Service.objects.create(**validated_data)
        for feature_data in features_data:
            ServiceFeature.objects.create(service=service, **feature_data)
        return service

    def update(self, instance, validated_data):
        features_data = validated_data.pop('features', None)
        
        # Update service fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update features if provided
        if features_data is not None:
            # Simple approach: clear existing and re-create
            instance.features.all().delete()
            for feature_data in features_data:
                ServiceFeature.objects.create(service=instance, **feature_data)
                
        return instance
