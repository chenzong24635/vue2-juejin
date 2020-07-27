interface subStateType {
  sort: string,
  subIndex: number,
}
interface listStateType {
  lists: any[],
  page: number,
  pageSize: number,
  isLoading: boolean,
  [property: string]: any
}