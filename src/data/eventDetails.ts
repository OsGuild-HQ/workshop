export interface EventDetail {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export const eventDetails: EventDetail[] = [
  { id: "location", label: "Location", value: "TBA", icon: "map-pin" },
  { id: "date", label: "Date", value: "TBA", icon: "calendar" },
  { id: "time", label: "Time", value: "TBA", icon: "clock" },
  { id: "organizer", label: "Organizer", value: "OSGuild", icon: "users" },
  { id: "partner", label: "Community Partner", value: "BitDevs Mauritius", icon: "handshake" },
];
