interface stateType{
  articleContent: objType,
  articleInfo: objType,
  relatedEntryLists: any[], // 侧边相关文章
  recommendEntryLists: any[], // 底部相关文章推荐
  isLike: boolean,
  isLoading: boolean,
  comments: any[],
  [propertyName: string]: any
}