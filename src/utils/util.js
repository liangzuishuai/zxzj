import moment from "moment";

function uploadXlsx (file){  
    return new Promise(resolve=>{
        let reader = new FileReader();
        if (typeof(FileReader.prototype.readAsBinaryString) !== "function") {
            let binary = "";
            // let pt = this;
            let reader = new FileReader();
            reader.onload = function (e) {
                let bytes = new Uint8Array(reader.result);
                let length = bytes.byteLength;
                for (let i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                // let obj = {};
                // obj.target = {result: binary};
                // console.log('obj', obj)
                resolve(binary)
            }
            reader.readAsArrayBuffer(file);
        }else {
            reader.readAsBinaryString(file);
            reader.onload = ev=>{
                console.log(ev)
                resolve(ev.target.result)
            }
        }
       
    })
}

function momentDateParam(date){
    if(date){
        return moment(new Date(date)).format('YYYYMMDD')
    }
    return ''
}

function getNowFormatDate(){
    return momentDateParam(new Date())
}

// 数据存在添加%号，不存在显示--
function formatRate(rate){
    // return rate != null ? rate.toFixed(2) + "%":'--'
    return rate != null && rate !=='' ? rate + "%":'--'
}

// 判断数据为空展示--
function decidEmpty(data){
    return data != null || data ==='' ? data + '%' :'--%'
}

// 获取两个日期相差天数
function getDateDiffDays(date1, date2){
    return moment(date1.toString()).diff(moment(date2.toString()), 'days')
}

// 获取相差几天的日期
function getDaysDate(startDate, term) {
    return moment(startDate.toString()).add(term, 'd').format('YYYYMMDD');
}

function percent2(value){
    if(value==0){
        return value
    }
    if(value!=null&&value!=undefined&&value!=''){
        if(value>1){
            return value+'%';
        }else{
            return Multiply(value, 100).toFixed(2)+'%';
        }
        
    }else{
        return '--'
    }
}

//只允许输入数值和两位小数
function formatDecimal (str, num) {//str当前输入值，num是想要保留的小数位数
    str = String(str)
    if (!str.trim()) {
      return str
    }
    var len1 = str.substr(0, 1)
    var len2 = str.substr(1, 1)
    // 如果第一位是0，第二位不是点，就用数字把点替换掉
    if (str.length > 1 && len1 === 0 && len2 !== '.') {
      str = str.substr(1, 1)
    }
    // 第一位不能是.
    if (len1 === '.') {
      str = ''
    }
    // 限制只能输入一个小数点
    if (str.indexOf('.') !== -1) {
      var str_ = str.substr(str.indexOf('.') + 1)
      if (str_.indexOf('.') !== -1) {
        str = str.substr(0, str.indexOf('.') + str_.indexOf('.') + 1)
      }
    }
    // 正则替换
    str = str.replace(/[^\d^.]+/g, '') // 保留数字和小数点
    if (num || num === 0) {
      var rest = str.split('.')[1]
      if (rest && rest.length > num) {
        rest = rest.substr(0, num)
        str = str.split('.')[0] + '.' + rest
      }
    }
    return str
 }

//加法 - 处理浮点数精度问题
function Add(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
//减法 - 处理浮点数精度问题
function Minus(arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
}
//乘法 - 处理浮点数精度问题
function Multiply(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(2)
}

export default {
    uploadXlsx,
    momentDateParam,
    getNowFormatDate,
    formatRate,
    decidEmpty,
    getDateDiffDays,
    getDaysDate,
    percent2,
    formatDecimal,
    Add,
    Minus,
    Multiply
}