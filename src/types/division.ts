import { IOfficer } from './officer'

export interface IDivision {
    id: number;
    name: string;
    acronym?: string;
    chiefID: number
    children: IDivision[];
    isOpen?: boolean; 
    isEditing?: boolean
}
