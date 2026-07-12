export interface Scripture {
  id: number;
  name: string;
  tradition: string;
  period: string;
  language: string;
  description: string;
  color: string;
  icon: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}