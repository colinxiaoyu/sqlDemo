# sqlDemo  东西写的比较多，比较杂，基本都是一些小demo
1. sql的使用

2. 自定义view单向控制，这点需注意几处容易出错的地方：view需自己定义style，否则可能会出现无法显示问题；单向流控制react->native，否则会逻辑混乱，可以NativeModule和ViewManager写在一起

3. 自己写的react-native打开doc文件，适配android和ios，思路说明 android 是将doc文件下载后，利用org.apache.poi解析成html，再用webview承载，ios比较简单，直接用webview承载要下载doc的url
