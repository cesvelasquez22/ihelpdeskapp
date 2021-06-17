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
        type: 'collapsable',
        icon: 'mat_outline:sticky_note_2',
        children: [
            {
                id: 'tickets.new',
                title: 'Nuevo ticket',
                type: 'basic',
                link: '/tickets/create',
            },
            {
                id: 'tickets.my',
                title: 'Mis tickets',
                type: 'basic',
                link: '/tickets/my',
            },
            {
                id: 'tickets.my',
                title: 'Asignados a mí',
                type: 'basic',
                link: '/tickets/my',
            },
            {
                id: 'tickets.search',
                title: 'Buscar tickets',
                type: 'basic',
                link: '/tickets/search',
            },
        ],
    },
    {
        id: 'customers',
        title: 'Clientes',
        type: 'basic',
        icon: 'mat_outline:groups',
        link: '/customers',
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
            {
                id: 'maintenances.categories',
                title: 'Categorías de tickets',
                type: 'basic',
                link: '/maintenances/categories',
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
        type: 'collapsable',
        icon: 'mat_outline:sticky_note_2',
        children: [
            {
                id: 'tickets.new',
                title: 'Nuevo ticket',
                type: 'basic',
                link: '/tickets/create',
            },
            {
                id: 'tickets.my',
                title: 'Mis tickets',
                type: 'basic',
                link: '/tickets/my',
            },
            {
                id: 'tickets.my',
                title: 'Asignados a mí',
                type: 'basic',
                link: '/tickets/my',
            },
            {
                id: 'tickets.search',
                title: 'Buscar tickets',
                type: 'basic',
                link: '/tickets/search',
            },
        ],
    },
    {
        id: 'customers',
        title: 'Clientes',
        type: 'basic',
        icon: 'mat_outline:groups',
        link: '/customers',
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
            {
                id: 'maintenances.categories',
                title: 'Categorías de tickets',
                type: 'basic',
                link: '/maintenances/categories',
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
        type: 'collapsable',
        icon: 'mat_outline:sticky_note_2',
        children: [
            {
                id: 'tickets.new',
                title: 'Nuevo ticket',
                type: 'basic',
                link: '/tickets/create',
            },
            {
                id: 'tickets.my',
                title: 'Mis tickets',
                type: 'basic',
                link: '/tickets/my',
            },
            {
                id: 'tickets.my',
                title: 'Asignados a mí',
                type: 'basic',
                link: '/tickets/my',
            },
            {
                id: 'tickets.search',
                title: 'Buscar tickets',
                type: 'basic',
                link: '/tickets/search',
            },
        ],
    },
    {
        id: 'customers',
        title: 'Clientes',
        type: 'basic',
        icon: 'mat_outline:groups',
        link: '/customers',
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
            {
                id: 'maintenances.categories',
                title: 'Categorías de tickets',
                type: 'basic',
                link: '/maintenances/categories',
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
        type: 'collapsable',
        icon: 'mat_outline:sticky_note_2',
        children: [
            {
                id: 'tickets.new',
                title: 'Nuevo ticket',
                type: 'basic',
                link: '/tickets/create',
            },
            {
                id: 'tickets.my',
                title: 'Mis tickets',
                type: 'basic',
                link: '/tickets/my',
            },
            {
                id: 'tickets.my',
                title: 'Asignados a mí',
                type: 'basic',
                link: '/tickets/my',
            },
            {
                id: 'tickets.search',
                title: 'Buscar tickets',
                type: 'basic',
                link: '/tickets/search',
            },
        ],
    },
    {
        id: 'customers',
        title: 'Clientes',
        type: 'basic',
        icon: 'mat_outline:groups',
        link: '/customers',
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
            {
                id: 'maintenances.categories',
                title: 'Categorías de tickets',
                type: 'basic',
                link: '/maintenances/categories',
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
