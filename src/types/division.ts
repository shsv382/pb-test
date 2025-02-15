import { Officer } from './officer'

export interface Division {
    id: number;
    name: string;
    staff: Officer[];
    children: Division[];
    isOpen?: boolean; 
    isEditing?: boolean
}
