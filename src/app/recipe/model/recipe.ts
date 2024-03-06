export interface Recipe {
    id?: number;
    name?: string;
    description?: string;
    instruction?: string;
    ingredients?: [];
    createdOn?: Date;
    updatedOn?: Date;
}
