from rest_framework import serializers
from projects.models import Project, ProjectImage
from services.models import Service
from services.serializers import ServiceSerializer
from media.serializers import MediaFileSerializer
from media.models import MediaFile

class ProjectImageSerializer(serializers.ModelSerializer):
    media_file_details = MediaFileSerializer(source='media_file', read_only=True)
    media_file_id = serializers.PrimaryKeyRelatedField(
        queryset=MediaFile.objects.all(), source='media_file', write_only=True
    )

    class Meta:
        model = ProjectImage
        fields = ('id', 'media_file_id', 'media_file_details', 'order', 'is_featured')

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, required=False)
    services_details = ServiceSerializer(source='services_rendered', many=True, read_only=True)
    services_ids = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), source='services_rendered', many=True, write_only=True, required=False
    )
    
    featured_image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = (
            'id', 'title', 'slug', 'description', 'long_description', 
            'client', 'industry', 'services_details', 'services_ids', 
            'live_url', 'github_url', 'status', 'images', 'featured_image',
            'created_at', 'updated_at'
        )

    def get_featured_image(self, obj):
        featured = obj.images.filter(is_featured=True).first()
        if not featured:
            featured = obj.images.first()
        if featured:
            # Return serialised media file info
            request = self.context.get('request')
            serializer = MediaFileSerializer(featured.media_file, context={'request': request})
            return serializer.data
        return None

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        services_data = validated_data.pop('services_rendered', [])
        
        project = Project.objects.create(**validated_data)
        
        # Set many to many services
        project.services_rendered.set(services_data)
        
        # Create project images
        for img in images_data:
            ProjectImage.objects.create(project=project, **img)
            
        return project

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', None)
        services_data = validated_data.pop('services_rendered', None)
        
        # Update normal fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update services if passed
        if services_data is not None:
            instance.services_rendered.set(services_data)
            
        # Update images if passed
        if images_data is not None:
            instance.images.all().delete()
            for img in images_data:
                ProjectImage.objects.create(project=instance, **img)
                
        return instance
