import { FuseNavigationItem } from '@fuse/components/navigation';

export const landingNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Inicio',
        type: 'basic',
        icon: 'mat_outline:home',
        link: 'home',
    },
    {
        id: 'about',
        title: 'Sobre nosotrosA',
        type: 'basic',
        icon: 'mat_outline:group',
        link: 'about',
    },
    {
        id: 'pricing',
        title: 'Planes',
        type: 'basic',
        icon: 'mat_outline:attach_money',
        link: 'pricing',
    },
    {
        type: 'divider',
    },
];
