import { IOfficer } from './officer'

export interface IDivision {
    id: number;
    name: string;
    chiefID: number
    children: IDivision[];
    isOpen?: boolean; 
    isEditing?: boolean
}
