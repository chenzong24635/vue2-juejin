export interface ProxyType<T>{
  [[Handler]]: {
    get: Function,
    set: Function,
    deleteProperty: Function,
    has: Function,
    ownKeys: Function,
  },
  [[Target]]: T,
  [[IsRevoked]]: boolean,
}

export interface propsBaseType{
  id: string,
  age: number
}
