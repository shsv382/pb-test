export interface IDivisionRAW {
    id: number;
    name: string;
    acronym?: string;
    childrenID?: number[];
    parentID?: number;
}

export interface IDivision extends IDivisionRAW {
    children: IDivision[];
    isOpen?: boolean; 
    isEditing?: boolean
}