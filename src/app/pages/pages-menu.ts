import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/pages/home',
  },
  {
    title: 'Usuario',
    icon: 'person-outline',//------------------------
    link: '/pages/user/index',
  },
  {
    title: 'Mesas',
    icon: 'archive-outline',//------------------------
    link: '/pages/table/index',
  },
  {
    title: 'Partidos',
    icon: 'people-outline',//------------------------
    link: '/pages/match/index',
  },
  {
    title: 'Candidatos',
    icon: 'person-outline',//------------------------
    link: '/pages/candidate/index',
  },
  {
    title: 'Resultados',
    icon: 'layers-outline',//------------------------
    link: '/pages/result/index',
  },
  {
    title: 'Cerrar Sesion',
    icon: 'log-out-outline',
    link: '/pages/security/logout',
  },
];



// {
//   title: 'Resultados',
//   icon: 'clipboard-outline',
//   children: [
//     {
//       title: 'A',
//       link: '/pages/result/a',
//     },
//     {
//       title: 'Mesas',
//       link: '/pages/result/b',
//     },
//     {
//       title: 'Partidos',
//       link: '/pages/result/c',
//     },
//     {
//       title: 'D',
//       link: '/pages/result/d',
//     },
//   ],
// },
