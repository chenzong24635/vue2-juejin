import {objType} from '@/types/commons'

export interface booksStateType{
  navLists: navListsType[],
  lists: any[],
  pageNum: number,
}
export interface bookStateType{
  bookDesc: objType,
  bookBuyers: any[],
  bookSections: any[],
  buyers: any[],
}

interface navListsType {
    id: string,
    name: string,
    score: string | number,
    createdAt: string,
    alias: string,
}


