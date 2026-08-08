from django.contrib.auth import get_user_model
from django.core.exceptions import PermissionDenied

User = get_user_model()

class UserService:
    @staticmethod
    def register_user(validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            company=validated_data.get('company', ''),
            role=User.VIEWER
        )
        return user

    @staticmethod
    def update_user_role(admin_user, target_user, new_role):
        if not admin_user.is_admin:
            raise PermissionDenied("Only administrators can change user roles.")
        
        if new_role not in dict(User.ROLE_CHOICES):
            raise ValueError(f"Invalid role: {new_role}")
            
        target_user.role = new_role
        target_user.save()
        return target_user
