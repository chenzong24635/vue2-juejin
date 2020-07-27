export interface sortsType{
  sort: string,
  type: string,
}
export interface stateType{
  sortType: string,
  sortIndex: number,
  page: number,
  pageSize: number,
  lists: any[],
  isLoading: boolean,
  attenders: objType,
  attendersLists:any[],
  [property: string]: any
}