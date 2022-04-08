// import $store from '../store'
// import router from "./index.js";
// console.log(router);
// // 拦截路由验证
// router.beforeEach((to, from, next) => {
//     console.log(to.fullPath,$store.state.token);
//     if (to.meta.requireAuth) { // 判断是否需要验证 
//         if ($store.state.token) { // 是否已登陆       
//             next() // 正常跳转  
//         } else {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }
//             }); // 需要验证 未登录 跳转到登录页  并且携带上 想要进入的路由 待登陆之后再跳转
//         }
//     } else {
//         // 不需要验证直接下一步
//         next()
//     };

//     /*如果已登陆不允许直接跳转到 登录页面*/
//     let fullPath = to.fullPath.substring(0, 6);
//     if (fullPath == "/login") {
//         if ($store.state.isLogin == true) {
//             next({
//                 path: from.fullPath
//             });
//         } else {
//             next();
//         }
//     }
// })