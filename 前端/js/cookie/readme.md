### Cookie, localStorage, sessionStorage 的使用:
[参考1:详说 Cookie, LocalStorage 与 SessionStorage](https://jerryzou.com/posts/cookie-and-web-storage/)

[参考2:cookie、sessionStorage、localStorage 详解及应用场景](https://jerryzou.com/posts/cookie-and-web-storage/)

#### 异同
- Cookie 
  - 由服务器生成，可设置失效时间。在浏览器端生成，默认关闭浏览器后失效。
  - 大小4k左右
  - 与服务器通信时，携带在HTTP头中。保存过多会带来性能问题
  - 接口不友好
- sessionStorage
  - 当前会话有效，关闭页面或浏览器后被清除
  - 5M左右
  - 不与服务器通信，仅在客户端保存
  - 接口友好
- localStorage
  - 默认永不清除
  - 其他与`sessionStorage`一致

#### 使用场景
- Cookie: 能精简就精简，可以用来判断用户是否登录（服务器端在用户登录时，往Cookie添加加密后的唯一标识码，用来标识用户，在下次登录时读取这个值就可以判断用户是否登录）
- sessionStorage: 内容太多的表单，可以拆分多个子页面，可以用`sessionStorage`来保存临时的数据。
- localStorage: 购物车的数据，HTML5游戏产生的本地数据都可以用它保存。

#### 使用
window.sessionStorage.setItem || getItem || removeItem 来添加，获取，移除
window.localStorage 同上 （也可作为对象，直接通过属性直接添加与读取）
```js
var obj2 = {var1: 'a', 'var2': 'b'}
window.sessionStorage.setItem('obj2',JSON.stringify(obj2))
obj2cp = JSON.parse(window.sessionStorage.getItem('obj2'))
```

cookie直接对`document.cookie`进行赋值
```
// 注意：分号后面有空格，name 和 value 都是变量
document.cookie = '{name}={value}; expires={expire}; path={path}; domain={domain}; secure={secure}
// cookie 是通过 name, domain, path 来唯一标识的，所以删除时需要输入这三个参数，
//!并且设置 过期的expire 或者 max-age=0 都可删除cookie
// 似乎不要 domain 和 path 也可以删除
function removeCookie(name, domain, path){
    expire = (new Date(0)).toUTCString();  //给定一个过期时间
    document.cookie = name+'=; domain='+(domain||'localhost')+
                            '; path='+(path||'/')+
                            '; expires='+expire; // ';max-age=0'
}
```
