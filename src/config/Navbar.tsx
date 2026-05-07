export interface NavItem {
  label: string;
  href: string;
}

export const navbarConfig = {
  navItems: [
    {
      label: 'Home',
      href: '/#home',
    },
    {
      label: 'About',
      href: '/#about',
    },
    {
      label: 'Skills',
      href: '/#skills',
    },
    {
      label: 'Projects',
      href: '/#projects',
    },
    {
      label: 'Experience',
      href: '/#experience',
    },
    {
      label: 'Achievements',
      href: '/#achievements',
    },
  ] as NavItem[],
};
