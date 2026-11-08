import type { User } from "@/lib/types";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavWorkMenuProps {
  pathname: string;
  services: NavItem[];
  projects: NavItem[];
}

export interface NavUserMenuProps {
  user: User;
  onLogout: () => void;
}

export interface NavMobileMenuProps {
  isOpen: boolean;
  pathname: string;
  user: User | null;
  userInitials: string;
  navLinks: readonly NavItem[];
  services: NavItem[];
  projects: NavItem[];
  onClose: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}
