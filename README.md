# Tongji-ykt

获取同济一卡通入学以来的所有流水信息并对数据进行分析

## 用法

1. 登录 [一卡通管理平台](http://yikatong.tongji.edu.cn)

2. 点击 "余额查询" 在表格的 "校园卡账户" 可以看到你的一卡通的编号,以后会用到

3. 修改 `getData.js` 里的信息 , 包括编号、起止时间、条数, 具体看代码注释

4. 按`F12`, 弹出控制台

5. 将 `getData.js` 的全部内容复制进去，运行

6. 不出意外,你将得到一个下载文件的提示窗,保存,这个json文件就是你的所有消费记录

7. ~~OK, 打开 `result.html` 就可以看到分析的结果啦~~


## 分析计划

1. [已解决！] 吃早饭数据分析(多久吃一次,大概几点吃)

2. 洗一次澡要多久(本部澡堂)

3. [已解决！] 最高一次花费,最高一次充值,共花费XX元,共充值XX元

4. 美化界面, 让数字显示得更加震撼

5. 未完待续,有啥建议提issue

P.S. 对于不用一卡通吃饭和洗澡的人肯定是不准的嘿嘿
