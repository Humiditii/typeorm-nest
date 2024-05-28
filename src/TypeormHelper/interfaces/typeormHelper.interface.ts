export interface PaginationOptionsI {
    page: number;
    limit: number;
}

export interface FilterI {
    field: string;
    value: any;
    operator: string;
}

export interface SortI {
    field: string;
    order: 'ASC' | 'DESC';
}