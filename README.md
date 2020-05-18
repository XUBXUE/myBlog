# myBlog

本项目名为兔子博客，是用于nodejs、mongodb、vue、webpack等技术开发的个人博客，功能简单，未来会不断扩展和完善

# rabbitBlog

兔子博客移动端系统，用于查看通过管理系统发布的个人博客，个人博客模块具有评论、点赞功能

# rabbitBlogManage

兔子博客PC端管理系统，用于对博客发布的增删改查操作

# rabbitBlogServer

兔子博客后台服务系统，基于nodejs+mongodb实现数据存储

# 以上三个项目启动命令均为

npm install

npm run serve

# 移动端、PC端系统打包命令均为

npm run build

其中后台服务系统需要配合mongodb才能跑起来，所以请安装并启动mongodb后，再启动rabbitBlogServer后台服务
后台配置的mongodb的URL为 “mongodb://localhost:27017/rabbitBlog”
如需修改，请修改 rabbitBlogServer/app/common/mongoPool.ts 文件中的url变量
链接mongodb后,无需建库建表,运行代码联调接口会自动创建

个人学习成果，功能简陋，漏洞和不足之处也一定很多，望见谅！

