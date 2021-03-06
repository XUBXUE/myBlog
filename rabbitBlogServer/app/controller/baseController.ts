let nodecache = require("nodecache");
const { v4: uuidv4 } = require('uuid');
export default class baseController {
    constructor() {
        
    }
    getUid() {
        return uuidv4();
    }
    getUserId() {
        let token = this.req.cookies.token;
        if(!token || !nodecache.get(token)) {
            return "";
        } else {
            return nodecache.get(token);
        }
    }
    success(data: any) {
        if(typeof data == "string") {
            this.res.end(data)
        } else {
            this.res.json({data: data, code: 200});
        }
    }
    error(data: any) {
        if(typeof data == "string") {
            this.res.end(data)
        } else {
            this.res.json({data: data, code: 500});
        }
    }
}