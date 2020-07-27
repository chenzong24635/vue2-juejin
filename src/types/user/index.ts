export interface tabsType{
  title: string,
  route: string,
  showCount: boolean,
  [name: string]: any
}
export interface tabsSelectsType{
  title: string,
  route: string,
  type?: string,
  count?: number,
}