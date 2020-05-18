import {controller, get, post} from '../utils/decorator';
import User from '../model/user';
import BaseController from './baseController';
let nodecache = require("nodecache");
let md5 = require("md5");

@controller("/user")
export default class UserController extends BaseController {
  user: any;
  constructor() {
    super();
    this.user = new User();
  }
  @post("/login")
  login(req: any, res: any) {
    let userName = req.param('userName');
    let password = req.param('password');
    this.user.queryUserInfoByPasswordAndUserName({
      userName: userName,
      password: password
    }, (data: any) => {
      if(data.length > 0) {
        let token =  md5(userName + password + new Date().getTime);
        nodecache.set(token, data[0].userId);
        //调用BaseController类的success方法给客户端传递json数据
        this.success({
          status: "success",
          data: {
            token: token,
            userName: userName
          }
        });
      } else {
        this.error({
          status: "error",
          msg: "登录失败,账号或密码错误！"
        });
      }
    })
  }
}