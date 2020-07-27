export interface propsType{
  id: string | number
}

export interface defaultCityType{
  readonly cityName: string,
  readonly cityAlias: string,
  readonly weight: number
}

export interface cityStateType{
  cityList: any[],
  allCity: any[],
}
export interface listStateType{
  lists: any[],
  pageNum: number,
  isLoading: boolean,
}