const BusiCodeDic = {
    "110B": "T+0",
    "111B": "T+1",
    "11ZB": "展期",
    "110S": "了结",
    "112B": "T+0双创版",
    "120S": "转结",
    "11MB": "自营出借",
    "11QB": "权益合约",
}
//合约状态
const CompactStatus = {
    "0":"正常", 
    "1":"已超期" ,
    "3":"已了结", 
    "4":"已提交归还申请"
}
//约定类型
const AppType = {
    "0":"约定申请",
    "2":"撤单申请",
    "3":"展期申请",
    "4":"归还申请",
}
//合约类型
const CompactType = {
    "0":"约定合约",
    "1":"权益合约",
}
//交易所名称
const ExchangeType = {
    "1":"上海",
    "2":"深圳",
    "B1":"上海",
    "B2":"深圳",
    "B3":"跨市场",
}
//日期类型
const AppDateType = {
    "0":"当日有效",
    "1":"约定日期前有效"
}
//确认状态
const ProcFlag = {
    "P":"预处理",
    "D":"已办理",
    "F":"失败",
    "H":"挂起",
    "N":"未处理",
    "S":"成功",
    "W":"办理中",
    "1":"已处理",
    "0":"未处理",
    "2":"挂起",
}
const riqi_code = {
    '0':'当日有效',
    '1':'约定日期前有效'
}
// 存续-委托查询-确认状态
const AppStatus = {
    "A":"全部",
    "W":"待确认",
    "P":"办理中",
    "V":"已确认",
    "6":"已撤销",
    "2":"已拒绝",
    "8":"部分部撤",
}

//展期标志
const ExFlag = {
    "0":"未展期",
    "1":"提出展期",
    "2":"已拒绝",
    "3":"已办理",
    "4":"办理中",
}
//是否竞价
const BidFlag = {
    "0":"否",
    "1":"是",
}
//确认状态
const ConfirmStatusDic = {
    "0":"已确认",
    "1":"待确认",
    "2":"已撤单",
    "4":"拒绝",
    "5":"已受理",
    "6":"办理中",
    "8":"部分确认",
    "9":"全部确认",
}

export default{
    BusiCodeDic,
    CompactStatus,
    AppType,
    ExchangeType, 
    AppDateType,
    ProcFlag,
    riqi_code,
    CompactType,
    AppStatus,
    ExFlag,
    BidFlag,
    ConfirmStatusDic
}