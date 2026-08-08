from rest_framework import permissions

class IsAdminUserRole(permissions.BasePermission):
    """
    Allows access only to users with the ADMIN role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_admin)

class IsEditorUserRole(permissions.BasePermission):
    """
    Allows access to users with the EDITOR or ADMIN role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_editor)

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allows write operations only to ADMIN users, and read operations to anyone.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_admin)

class IsEditorOrReadOnly(permissions.BasePermission):
    """
    Allows write operations only to EDITOR or ADMIN users, and read operations to anyone.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_editor)
