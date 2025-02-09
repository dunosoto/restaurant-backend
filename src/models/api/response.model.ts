export interface Response<T> {
  message: string,
  data: T
}

export interface PaginationResponse<T> {
  message: string,
  data: T
  meta: PagintationMeta
}

export interface PagintationMeta {
  total: number,
  page: number,
  lastPage: number
}