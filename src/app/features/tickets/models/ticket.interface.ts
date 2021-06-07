import { Department } from "app/features/maintenances/models/department.interface";

export interface Ticket {
    uid?: string;
    department: Department;
    subject: string;
    customer: string;
    createdAt?: firebase.default.firestore.Timestamp;
    priority: TicketPriority;
    category:TicketCategory;
    ticketState: TicketState
}

export interface TicketPriority {
    uid?: string;
    name?: string;
    value?: number;
}

export enum TicketState {
    new = 'Nuevo',
    inProgress = 'En progreso',
    qat = 'QAT',
    done = 'Terminado'
}

export enum TicketCategory {
    question = 'Pregunta',
    incidence = 'Incidencia',
    support = 'Soporte'
}