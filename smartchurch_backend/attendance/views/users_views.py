from rest_framework import viewsets
from django.contrib.auth.models import User
from ..serializers import UserWithProfileSerializer

class UserManageViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserWithProfileSerializer