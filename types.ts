export interface TeamMember {
  id: string;
  name: string;
  role: 'Leader' | 'Manager' | 'Consultant';
  email: string;
  phone: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
  imageUrl?: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  type: 'Mentoring' | 'Consulting' | 'Meeting';
  consultantId: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Manual' | 'Sales' | 'Contract' | 'Education';
  date: string;
  size: string;
  format: 'PDF' | 'PPT' | 'DOC';
}

export interface AdminLog {
  id: string;
  action: string;
  admin: string;
  timestamp: string;
  status: 'Success' | 'Warning';
}