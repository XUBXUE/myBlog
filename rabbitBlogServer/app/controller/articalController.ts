import {controller, get, post} from "../utils/decorator";
import artical from "../model/artical";
import baseController from "./baseController";
@controller("/artical")
export default class articalController extends baseController{
     artical: any
     constructor() {
          super();
          this.artical = new artical();
     }
     @get("/saveArtical")
     public saveArtical(req: any, res: any) {
          let userId = this.getUserId(); 
          if(!userId) {
               this.error({
                    code: 401,
                    msg: 'token失效！'
               }); 
               return;
          } 
          let articalId = req.param("articleId") || this.getUid(); //如果没有articalId说明是创建文章 则生成随机编码
          this.artical.insertArtical({
               articalId: articalId,
               title: req.param("title"),
               type: req.param("type"),
               content: req.param("content"),
               publishDate: new Date(),
               userId: userId
          }, (data:any) => {
               console.log(data)
               if(data.ok == 1){
                    this.success({
                         status: "success",
                         data: {
                              articalId: articalId,
                              userId: userId
                         }
                    });
               } else {
                    this.error({
                         status: "error",
                         msg: "发布失败！"
                    });
               }
          });
     }
     @get("/getArticalDetail")
     public getArticalDetail(req: any, res: any) {
          this.artical.queryArticalById(req.param("articalId"), (data: any)=> {
               this.success(data);
          });        
     }
     @get("/getArticalList")
     public getArticalList(req: any, res: any) {
          let userId = this.getUserId(); 
          if(!userId) {
               this.error({
                    code: 401,
                    msg: 'token失效！'
               }); 
               return;
          } 
          this.artical.queryArticalList(req.param("currentPage"), req.param("key"), 10, userId, (data:any)=> {
               this.success(data);   
          });
     }
     @get("/getAllArticalList")
     public getAllArticalList(req: any, res: any) {
          this.artical.queryArticalList(req.param("currentPage"), req.param("key"), 10, "", (data:any)=> {
               this.success(data);   
          });
     }
     @get("/deleteArticalById")
     public deleteArticalById(req: any, res: any) {
          let userId = this.getUserId(); 
          if(!userId) {
               this.error({
                    code: 401,
                    msg: 'token失效！'
               }); 
               return;
          } 
          this.artical.deleteArticalById(req.param("articalId"), userId, (data: any) => {
               console.log(data)
               if(data.ok == 1){
                    this.success({
                         status: "success",
                         data: {
                              articalId: req.param("articalId"),
                         }
                    });
               } else {
                    this.error({
                         status: "error",
                         msg: "删除失败！"
                    });
               }
          });
     }
}