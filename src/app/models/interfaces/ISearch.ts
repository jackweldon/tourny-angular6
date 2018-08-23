export interface ISearch {
    pageSize: number;
    page: number;
    sortBy: string;
    isSortAscending: boolean;
}

export interface ISearchResult {
    items: any[];
    totalItems: number;
}