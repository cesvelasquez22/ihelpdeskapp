import { FuseNavigationItem } from '@fuse/components/navigation';

export const landingNavigation: FuseNavigationItem[] = [
    {
        id: 'customer-detail.general-data',
        title: 'Datos generales',
        type: 'basic',
        icon: 'mat_outline:person_pin',
        link: 'general-data',
    },
    {
        id: 'customer-detail.customer-sales',
        title: 'Datos de ventas',
        type: 'basic',
        icon: 'mat_outline:attach_money',
        link: 'customer-sales',
    },
    {
        id: 'customer-detail.aditional-data',
        title: 'Datos adicionales',
        type: 'basic',
        icon: 'heroicons_outline:briefcase',
        link: 'aditional-data',
    },
    {
        type: 'divider',
    },
];
