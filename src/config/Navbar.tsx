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
      label: 'Skills',
      href: '/#skills',
    },
    {
      label: 'Projects',
      href: '/#projects',
    },
    {
      label: 'Achievements',
      href: '/#achievements',
    },
  ] as NavItem[],
};
