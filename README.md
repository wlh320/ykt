# Tongji-ykt

获取同济一卡通入学以来的所有流水信息并对数据进行分析

本来想做一个网站，因为平台在内网无法实现，因此用`electron`打包, 方便使用

## 用法(已更新)

1. 登录 [一卡通管理平台](http://yikatong.tongji.edu.cn)

2. 根据你使用的浏览器获取`cookie`的方法取得一卡通管理平台登录后获得的`hallticket`这一项，复制它的值

3. 打开本软件, 输入, 等待分析结果

## Dependencies

  - request
  - vue
  - express
  - electron

## 分析计划

未完待续,有啥建议提issue

1. [已解决！] 吃早饭数据分析(多久吃一次,大概几点吃)

2. 洗一次澡要多久(本部澡堂)

3. [已解决！] 最高一次花费,最高一次充值,共花费XX元,共充值XX元

4. 美化界面, 让数字显示得更加震撼

5. 模拟登录，简化使用步骤 

P.S. 对于不用一卡通吃饭和洗澡的人肯定是不准的嘿嘿


## 说明

1. 本网站分析的数据来自于同济一卡通综合管理平台http://yikatong.tongji.edu.cn

2. 数据基于一卡通消费流水，存在的误差在所难免，分析结果仅供参考

3. 数据的获取是使用用户登录后的cookie, 一卡通网站 cookie 关闭浏览器后失效，因此不会造成安全问题

4. 郑重承诺仅爬取数据，用后即焚，不会暗中收集用户数据
