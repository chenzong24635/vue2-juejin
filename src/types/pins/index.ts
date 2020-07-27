export interface leftRouteParamsType {
  name: string,
  title: string,
  apiData?: objType
}

export interface pinsStateType{
  routeName: string,
  apiParmas: objType|string,
  hasNextPage: boolean,
  isLoading: boolean,
  endCursor: string,
  lists: any[],
  hotLists: any[],
  [propertyName: string]: any
}

export interface pinDetailType{
  comments: any[],
  count: number,
}
export interface pinListType{
  pageNum: number,
  isLoading: boolean,
}