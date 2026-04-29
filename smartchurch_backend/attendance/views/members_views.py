from rest_framework import viewsets
from ..models import Member, Guest, MemberFaceEmbedding
from ..serializers import MemberSerializer, GuestSerializer, MemberFaceEmbeddingSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().order_by('-created_at')
    serializer_class = MemberSerializer

class GuestViewSet(viewsets.ModelViewSet):
    queryset = Guest.objects.all().order_by('-created_at')
    serializer_class = GuestSerializer

class MemberFaceEmbeddingViewSet(viewsets.ModelViewSet):
    queryset = MemberFaceEmbedding.objects.select_related('member').all()
    serializer_class = MemberFaceEmbeddingSerializer