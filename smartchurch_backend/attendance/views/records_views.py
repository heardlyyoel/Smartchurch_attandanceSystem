from rest_framework import viewsets
from ..models import TimelineDataRecord, Attendance, SummaryReport
from ..serializers import TimelineDataRecordSerializer, AttendanceSerializer, SummaryReportSerializer

class TimelineDataRecordViewSet(viewsets.ModelViewSet):
    queryset = TimelineDataRecord.objects.select_related(
        'matched_member', 'final_member', 'final_guest'
    ).all().order_by('-capture_time')
    serializer_class = TimelineDataRecordSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.select_related(
        'member', 'guest', 'timeline_data'
    ).all().order_by('-attendance_date', '-check_in_time')
    serializer_class = AttendanceSerializer

class SummaryReportViewSet(viewsets.ModelViewSet):
    queryset = SummaryReport.objects.all().order_by('-report_date')
    serializer_class = SummaryReportSerializer