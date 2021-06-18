import { Department } from "app/features/maintenances/models/department.interface";

export interface Customer {
    uid: string;
    displayName: string;
    email: string;
    department: Department;
    active: boolean;
}