import logging
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError, APIException

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    """
    Custom exception handler that returns standardized JSON responses:
    {
        "status": "error",
        "code": "ERROR_CODE",
        "message": "User-friendly message",
        "errors": { ... } or null
    }
    """
    # Call DRF's default exception handler first to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        # Standardize DRF validation error response
        if isinstance(exc, ValidationError):
            response.data = {
                "status": "error",
                "code": "VALIDATION_FAILED",
                "message": "Validation failed for one or more fields.",
                "errors": response.data
            }
        else:
            # Custom code matching standard DRF status code
            code = "API_ERROR"
            if response.status_code == status.HTTP_401_UNAUTHORIZED:
                code = "UNAUTHENTICATED"
            elif response.status_code == status.HTTP_403_FORBIDDEN:
                code = "PERMISSION_DENIED"
            elif response.status_code == status.HTTP_404_NOT_FOUND:
                code = "NOT_FOUND"
            elif response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED:
                code = "METHOD_NOT_ALLOWED"
            elif response.status_code == status.HTTP_429_TOO_MANY_REQUESTS:
                code = "RATE_LIMIT_EXCEEDED"

            # Retrieve detail message
            message = response.data.get("detail", str(exc))
            if isinstance(message, dict):
                # If detail is nested, format it
                message = str(message)

            response.data = {
                "status": "error",
                "code": code,
                "message": message,
                "errors": None
            }
    else:
        # For non-DRF errors (like Django or generic database errors, server crashes)
        logger.exception("Server crash or unhandled python exception:", exc_info=exc)
        
        response = Response(
            {
                "status": "error",
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected server error occurred. Please try again later.",
                "errors": None
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return response
