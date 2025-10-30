/**
 * Type definitions for the application
 */

export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
}

export interface Goal {
  id: number;
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}
