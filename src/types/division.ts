export interface IDivisionRAW {
    id: number;
    name: string;
    acronym?: string;
    chiefID: number;
    childrenID?: number[];
    parentID: number;
}

export interface IDivision extends IDivisionRAW {
    children: IDivision[];
    isOpen?: boolean; 
    isEditing?: boolean
}