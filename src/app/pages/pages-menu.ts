import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/pages/home',
  },
  {
    title: 'Resultados',
    icon: 'clipboard-outline',
    children: [
      {
        title: 'A',
        link: '/pages/result/a',
      },
      {
        title: 'B',
        link: '/pages/result/b',
      },
      {
        title: 'C',
        link: '/pages/result/c',
      },
      {
        title: 'D',
        link: '/pages/result/d',
      },
    ],
  },
  {
    title: 'Cerrar Sesion',
    icon: 'log-out-outline',
    link: '/pages/logout',
  },
];
