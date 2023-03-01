export interface Pagination {
  page: number;
  limit: number;
  maxPages: number;
  maxCount: number;
  hasLast: boolean;
  hasNext: boolean;
}
