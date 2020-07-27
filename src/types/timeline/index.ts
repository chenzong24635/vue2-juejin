  export interface stateType{
    isLoading: boolean,
    hasNextPage: boolean,
    endCursor: string,
    lists: any[],
    order: string,
    subIndex: number,
    apiParmas: objectType,
    [propertyName: string]: any
  }
  
  export interface subNavsType{
    title: string,
    order: string
  }