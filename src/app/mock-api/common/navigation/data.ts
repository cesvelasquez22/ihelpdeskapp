/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
    {
        id: 'tickets',
        title: 'Tickets',
        type: 'basic',
        icon: 'mat_outline:sticky_note_2',
        link: '/tickets',
    },
    {
        id: 'maintenances',
        title: 'Mantenimientos',
        type: 'collapsable',
        icon: 'mat_outline:settings',
        children: [
            {
                id: 'maintenances.departments',
                title: 'Departamentos',
                type: 'basic',
                link: '/maintenances/departments',
            },
        ],
    },
    {
        id: 'security',
        title: 'Seguridad',
        type: 'collapsable',
        icon: 'mat_outline:shield',
        children: [
            {
                id: 'security.users',
                title: 'Usuarios',
                type: 'basic',
                link: '/security/users',
            },
            {
                id: 'security.roles',
                title: 'Roles',
                type: 'basic',
                link: '/security/roles',
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
    {
        id: 'tickets',
        title: 'Tickets',
        type: 'basic',
        icon: 'mat_outline:sticky_note_2',
        link: '/tickets',
    },
    {
        id: 'maintenances',
        title: 'Mantenimientos',
        type: 'collapsable',
        icon: 'mat_outline:settings',
        children: [
            {
                id: 'maintenances.departments',
                title: 'Departamentos',
                type: 'basic',
                link: '/maintenances/departments',
            },
        ],
    },
    {
        id: 'security',
        title: 'Seguridad',
        type: 'collapsable',
        icon: 'mat_outline:shield',
        children: [
            {
                id: 'security.users',
                title: 'Usuarios',
                type: 'basic',
                link: '/security/users',
            },
            {
                id: 'security.roles',
                title: 'Roles',
                type: 'basic',
                link: '/security/roles',
            },
        ],
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
    {
        id: 'tickets',
        title: 'Tickets',
        type: 'basic',
        icon: 'mat_outline:sticky_note_2',
        link: '/tickets',
    },
    {
        id: 'maintenances',
        title: 'Mantenimientos',
        type: 'collapsable',
        icon: 'mat_outline:settings',
        children: [
            {
                id: 'maintenances.departments',
                title: 'Departamentos',
                type: 'basic',
                link: '/maintenances/departments',
            },
        ],
    },
    {
        id: 'security',
        title: 'Seguridad',
        type: 'collapsable',
        icon: 'mat_outline:shield',
        children: [
            {
                id: 'security.users',
                title: 'Usuarios',
                type: 'basic',
                link: '/security/users',
            },
            {
                id: 'security.roles',
                title: 'Roles',
                type: 'basic',
                link: '/security/roles',
            },
        ],
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
    {
        id: 'tickets',
        title: 'Tickets',
        type: 'basic',
        icon: 'mat_outline:sticky_note_2',
        link: '/tickets',
    },
    {
        id: 'maintenances',
        title: 'Mantenimientos',
        type: 'collapsable',
        icon: 'mat_outline:settings',
        children: [
            {
                id: 'maintenances.departments',
                title: 'Departamentos',
                type: 'basic',
                link: '/maintenances/departments',
            },
        ],
    },
    {
        id: 'security',
        title: 'Seguridad',
        type: 'collapsable',
        icon: 'mat_outline:shield',
        children: [
            {
                id: 'security.users',
                title: 'Usuarios',
                type: 'basic',
                link: '/security/users',
            },
            {
                id: 'security.roles',
                title: 'Roles',
                type: 'basic',
                link: '/security/roles',
            },
        ],
    },
];
