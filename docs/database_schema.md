
# Database Schema Documentation

## Overview
The School Management System database is designed to handle users (staff, students, parents), academic structures (classes, subjects), scheduling (timetables, events), and administrative tasks (attendance, finance, logs).

## ERD Description

### User Management
- **User**: Central identity table linked to Clerk Auth.
  - Linked to specific profiles: `Student`, `Teacher`, `Parent`, `Staff`.
  - Roles: ADMIN, TEACHER, STUDENT, PARENT, STAFF.
  - Relations: `Notification`, `AuditLog`.

### Academic Structure
- **School**: Root entity.
- **AcademicYear**: Belongs to School. Tracks years (e.g., "2023-2024").
- **Class**: Belongs to AcademicYear. Represents a grade (e.g., "Grade 10").
- **Section**: Subdivision of Class (e.g., "A", "B"). Contains `Students`.
- **Subject**: Global list of subjects.
- **ClassSubject**: Pivot table linking Class, Subject, and Teacher (assigning a teacher to a subject for a class).

### Scheduling & Calendar
- **Lesson (Timetable)**: Weekly recurrent schedule.
  - Links: `Class`, `Section`, `Subject`, `Teacher`.
  - Attributes: `day`, `startTime`, `endTime`, `roomId`.
- **Event**: Calendar entries (Holidays, Exams, Meetings).
  - Attributes: `startDate`, `endDate`, `type`.

### Students & Personnel
- **Student**: Academic profile.
  - Links: `User`, `Section` (current class), `Parents`.
- **Teacher**: Staff profile.
  - Links: `User`, `ClassSubject` (subjects taught), `Section` (class teacher).
- **Parent**: Guardian profile.
  - Links: `User`, `Students` (via `ParentStudent`).
- **Staff**: Non-teaching staff profile.
  - Links: `User`.

### Attendance
- **StudentAttendance**: Daily attendance for students.
- **TeacherAttendance**: Daily attendance for teachers.

### Exams & Results
- **Exam**: Exam definition (e.g. "Midterm").
- **ExamSchedule**: Specific exam instance for a Class+Subject.
- **Mark**: Result for a Student in an ExamSchedule.

### Communication
- **Announcement**: Broadcast messages.
- **Notification**: Targeted user alerts.

### System
- **AuditLog**: Security and activity tracking.
- **SystemSetting**: Global configuration (key-value).

## Table Details

### `lessons`
| Column | Type | Description |
|---|---|---|
| `id` | UUID | PK |
| `name` | String | Descriptor (e.g. "Math Period 1") |
| `day` | DayOfWeek | Enum: MONDAY..SUNDAY |
| `startTime` | String | "HH:mm" format |
| `endTime` | String | "HH:mm" format |
| `classId` | UUID | FK to Class |
| `sectionId` | UUID | FK to Section (Optional) |
| `subjectId` | UUID | FK to Subject |
| `teacherId` | UUID | FK to Teacher (Optional) |
| `roomId` | String | Location |

### `events`
| Column | Type | Description |
|---|---|---|
| `id` | UUID | PK |
| `title` | String | Event Name |
| `type` | EventType | HOLIDAY, EXAM, MEETING... |
| `startDate` | DateTime | Start |
| `endDate` | DateTime | End |
| `allDay` | Boolean | Is full day? |

### `notifications`
| Column | Type | Description |
|---|---|---|
| `id` | UUID | PK |
| `userId` | UUID | FK to User (Recipient) |
| `title` | String | Short header |
| `message` | String | Content |
| `isRead` | Boolean | Read status |

### `system_settings`
| Column | Type | Description |
|---|---|---|
| `key` | String | PK, Identifer |
| `value` | String | Config value |

## Migration Notes
- Migration Name: `add_timetable_events_notifications_settings`
- Status: Applied.
- No data loss occurred as these are new tables.
