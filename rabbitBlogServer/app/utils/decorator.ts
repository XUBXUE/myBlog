import "reflect-metadata";
const PATH_METADATA = Symbol();
const METHOD_METADATA = Symbol();
const descriptorBuilder = {
  /**
   * 
   * @param path @get/@post(path)中的path参数
   * @param target 方法对象 例如{getorderInfo: function, getorderList: function}
   * @param key 方法名
   * @param method 请求方式(get/post)
   */
  setMapping(target: any, key: string | symbol, path: string, method: string) {
    if(!target.constructor.mapping) {
      target.constructor.mapping = {};
    }
    target.constructor.mapping[path] = {
      method: method,
      callback: target[key] 
    }
  },
  /**
   * 
   * @param path @controller(path)中的path参数
   * @param target controller类
   * @param key 方法名
   * @param method 请求方式(get/post)
   */
  setRouter(target: any, path: string) {
    let routerMap = target.mapping;
    for(let childpath in routerMap) {
      let comboPath = childpath;
      if(path != "/") {
        comboPath = path + childpath;
      }
      global.app[routerMap[childpath].method](comboPath, function(req: any, res: any) {
        let instance = new target();
        instance.req = req;
        instance.res = res;
        routerMap[childpath].callback.call(instance, req, res);
      })
    }
  }
}
/**
 * 
 * @param path @controller(path)中的path参数
 * @param target controller类
 */
const controller = (path: string) => {
  return (target: any) => {
    descriptorBuilder.setRouter(target, path);
    Reflect.defineMetadata(PATH_METADATA, path, target);
  }
}
/**
 * 
 * @param path @get/@post(path)中的path参数
 * @param target 方法对象 例如{getorderInfo: function, getorderList: function}
 * @param key 方法名
 * @param descriptor descriptor.value为方法
 */
const get =  (path: string) => {
  return (target: any, key: string | symbol, descriptor: any) => {
    descriptorBuilder.setMapping(target, key, path, "get");
    Reflect.defineMetadata(PATH_METADATA, path, target, descriptor.value);
  }
}
const post =  (path: string) => {
  return (target: any, key: string | symbol, descriptor: any) => {
    descriptorBuilder.setMapping(target, key, path, "post");
    Reflect.defineMetadata(PATH_METADATA, path, target, descriptor.value);
  }
}
export {controller, get, post};