export interface MenuRoute {
  path: string;
  title: string;
  icon?: string;
  submenu?: MenuRoute[];
}

export const MENU_ROUTES: MenuRoute[] = [
  {
    path: '/documents',
    title: 'Documents',
    icon: 'file_copy',
  },
  {
    path: '/tags',
    title: 'Tags',
    icon: 'note',
  },
  {
    path: '/correspondents',
    title: 'Correspondents',
    icon: 'perm_identity',
  }
];

export const MENU_TITLE = 'Paperless NG';
