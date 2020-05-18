import db from "../common/db";
export default class User {
  queryUserInfoByPasswordAndUserName(data: any, callback: Function) {
    db.select({
      bizType: "rabbitBlog", //数据库
      collection: "user", //数据表
      query: {
        userName: data.userName,
        password: data.password
      },
    }, (res: any) => {
      callback(res)
    })
  }
}