// 时间格式化
export const parseTime = (time) => {
    const format = "{y}-{m}-{d} {h}:{i}:{s}";
    let date = null;

    if (typeof time === "string") {
        time = parseInt(time);
    }
    date = new Date(time);

    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
    };
    const strTime = format.replace(/{(y|m|d|h|i|s)+}/g, (result, key) => {
        let value = formatObj[key];
        if (result.length > 0 && value < 10) {
            value = "0" + value;
        }
        return value;
    });
    return strTime;
};
// 价钱处理
export function toMoney(money = 0) {
    return money.toFixed(2);
}
// 本例子代表生成100000-999999的随机数
export const getRandomNum = (Min, Max) => {
    var Range = Max - Min;
    var Rand = Math.random();
    return Min + Math.round(Rand * Range);
};

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
// export const debounce = (fn, delay = 500) => {
// 	clearTimeout(_debounceTimeout);
// 	_debounceTimeout = setTimeout(() => {
// 		fn();
// 	}, delay);
// }
// function debounce (fun,wait) {
// 	return function(){
// 		clearTimeout(timeout);
// 		timeout = setTimeout(() => {
// 			fun.apply(this,arguments)
// 		}, wait);
// 	}
// }

export const debounce = (func, wait = 1000, immediate = true) => {
    let timer;
    console.log(1);
    return function () {
        console.log(123);
        let context = this,
            args = arguments;
        if (timer) clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);
            if (callNow) func.apply(context, args);
        } else {
            timer = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
    };
};
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn, delay = 500) => {
    // last为上一次触发回调的时间, timer是定时器
    let last = 0,
        timer = null;
    // 将throttle处理结果当作函数返回

    return function () {
        // 保留调用时的this上下文
        let context = this;
        // 保留调用时传入的参数
        let args = arguments;
        // 记录本次触发回调的时间
        let now = +new Date();

        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last < delay) {
            // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, delay);
        } else {
            // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
            last = now;
            fn.apply(context, args);
        }
    };
};

/**
 * 获取页面栈
 * @param {Number} preIndex为1时获取上一页
 * @return {Object}
 */

//二维数组去重
export const getUnique = (array) => {
    let obj = {};
    return array.filter((item, index) => {
        let newItem = item + JSON.stringify(item);
        return obj.hasOwnProperty(newItem) ? false : (obj[newItem] = true);
    });
};

// 判断类型集合
export const checkStr = (str, type) => {
    switch (type) {
        case "mobile": //手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case "tel": //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case "card": //身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case "mobileCode": //6位数字验证码
            return /^[0-9]{6}$/.test(str);
        case "pwd": //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^([a-zA-Z0-9_]){6,18}$/.test(str);
        case "payPwd": //支付密码 6位纯数字
            return /^[0-9]{6}$/.test(str);
        case "postal": //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case "QQ": //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case "email": //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case "money": //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case "URL": //网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
                str
            );
        case "IP": //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
                str
            );
        case "date": //日期时间
            return (
                /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
                    str
                ) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
            );
        case "number": //数字
            return /^[0-9]$/.test(str);
        case "english": //英文
            return /^[a-zA-Z]+$/.test(str);
        case "chinese": //中文
            return /^[\\u4E00-\\u9FA5]+$/.test(str);
        case "lower": //小写
            return /^[a-z]+$/.test(str);
        case "upper": //大写
            return /^[A-Z]+$/.test(str);
        case "HTML": //HTML标记
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        case "password": //HTML标记
            return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(str);
        default:
            return true;
    }
};
