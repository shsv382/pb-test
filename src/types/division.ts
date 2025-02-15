import { Officer } from './officer'

export interface Division {
    id: number;
    name: string;
    chiefID: number
    children: Division[];
    isOpen?: boolean; 
    isEditing?: boolean
}
