import {objType} from '@/types/commons'

export interface subNavsType{
  title: string,
  type: string
}

export interface stateType{
  isLoading: boolean,
  hasNextPage: boolean,
  endCursor: string,
  lists: any[],
  [property: string]: any
}
