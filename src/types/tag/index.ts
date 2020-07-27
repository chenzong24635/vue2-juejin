export interface subNavsType {
  sort: string;
  title: string;
}

export interface stateType {
  sort: string,
  tagid: string,
  page: number,
  pageSize: number,
  total: number,
  lists: any[],
  subscribe: objType,
  isLoading: boolean,
  [property: string]: any
}