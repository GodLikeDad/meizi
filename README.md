# 妹子图完整源码

一共四个项目，懒得维护了，想要的拿去玩。

## 项目结构

- meizitu 客户端前端，preact
- mzadmin 管理端前端，react
- mzapi API，nodejs+腾讯云函数+api网关
- mzscraper 图片爬虫，绿洲的爬虫，nodejs

数据库使用的百度[表格存储](https://cloud.baidu.com/product/bts.html)，用的时候还是免费的，自己看文档折腾一下吧

整套架构下来前端部署在对象存储或虚拟机，后端使用云函数，免运维，客观来说可靠性可用性还不错。

为啥后端用腾讯云不用百度云全家桶呢？

因为百度云的API网关坑过我一次，阿里云也坑过我一次，所以后面选择了腾讯云。

就这样，好好玩。