import db from "../common/db";
export default class thumbsUp {
    updateThumbs(data: any, callback: Function) {
        db.update({
            bizType: "rabbitBlog",//数据库
            collection: "thumbs_up", //数据表
            query: {articalId: data.articalId},
            data
        }, (res:any)=> {
            callback(res.result);
        });
    }
    queryThumbsCountByArticalId(articalId:number, callback : Function) {
        db.select({
            bizType: "rabbitBlog",//数据库 
            collection: "thumbs_up", //数据表
            query: {
                articalId: articalId
            }
        }, (res:any) => {
            callback(res);   
        });
    }
}