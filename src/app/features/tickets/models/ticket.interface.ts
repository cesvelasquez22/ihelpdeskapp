import { Department } from 'app/features/maintenances/models/department.interface';

export interface Ticket {
    uid?: string;
    department: Department;
    subject: string;
    description: string;
    customer: {
        uid: string;
        email: string;
        displayName: string;
        department: string;
    };
    createdAt?: firebase.default.firestore.Timestamp;
    priority: TicketPriority;
    category: { uid: string; name: string };
    ticketState: string;
    attendedBy: {
        uid?: string;
        name?: string;
        email?: string;
    };
}

export interface TicketPriority {
    uid?: string;
    name?: string;
    value?: number;
}

export enum TicketState {
    new = 'Nuevo',
    inProgress = 'En progreso',
    qat = 'Revisión del cliente',
    done = 'Resuelto',
}

export enum TicketCategory {
    question = 'Pregunta',
    incidence = 'Incidencia',
    support = 'Soporte',
}
