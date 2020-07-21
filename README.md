## ts相关

* 'ReadonlyArray' is not defined  
使用 Object.freeze() 对静态数据冻结时,

类型定义 number[] ，此时会警告
```js
let arr: number[] = Object.freeze([1,2,3])

The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
```

定义为 ReadonlyArray 则会直接报错
```js
let arr: ReadonlyArray<number> = Object.freeze([1,2,3])
```
