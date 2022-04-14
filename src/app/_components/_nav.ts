import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Quản trị',
    url: '/coreui/base',
    icon: 'icon-settings',
    children: [
      {
        name: 'Quản lý users',
        url: '/users',
        icon: 'icon-puzzle'
      },
      {
        name: 'Quản lý phân quyền',
        url: '/coreui/base/carousels',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Colors',
    url: '/dashboard',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/dashboard',
    icon: 'icon-pencil'
  },
  {
    name: 'Base',
    url: '/coreui/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/coreui/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/coreui/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/coreui/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/coreui/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Navbars',
        url: '/coreui/base/navbars',
        icon: 'icon-puzzle'

      },
      {
        name: 'Pagination',
        url: '/coreui/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/coreui/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/coreui/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/coreui/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/coreui/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/coreui/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/coreui/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
];
