// lib/constants/MenuItems.ts

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;  // Make external optional
}

export const desktopMenuItems: MenuItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'courses', label: 'Courses', href: '/courses' },
  { id: 'admission', label: 'Admission', href: '/admission' },
  { id: 'news', label: 'News', href: '/news' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export const authMenuItems = [
  { label: 'Register', href: '#register', type: 'button' },
  { label: 'Login', href: '#login', type: 'link' },
];