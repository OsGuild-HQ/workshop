export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

export interface WorkshopDetails {
  title: string;
  tagline: string;
  date: string;
  location: string;
  schedule: ScheduleItem[];
}
