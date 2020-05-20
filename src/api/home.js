import request from './index'


const lists = (data) => {
  return request({
    method: 'POST',
    url: 'https://web-api.juejin.im/query',
    // url: 'https://web-api.juejin.im/query/v1/topicList',
    data
  })
}
export default{
  lists
}

/* export const recommend = (
  queryId ="21207e9ddb1de777adeaca7a2fb38030", 
  after = "",
  order = "POPULAR", 
  tags = [],
  category = "",
) => {
  let data = {
    operationName: "",
    query: "",
    variables: {
      first: 20,
      after,
      order
    },
    extensions: {
      query: {
        id: queryId
      }
    }
  };

  //后端下的sub列表，数组形式存在tags里
  if(type === "backend"){ 
    data.variables = {
      ...data.variables,
    }
  }
  return request({
    method: 'POST',
    url: 'https://web-api.juejin.im/query/v1/topicList',
    data
  })
} */