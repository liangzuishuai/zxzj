import XLSX from "xlsx";
import FileSaver from "file-saver";
import moment from "moment";

// 检查数据是否为空
function checkNull(data){
    return data === '' || data == null
}
// 检查股票代码是否符合条件
function checkErrStockCode(StockCode){
    StockCode = StockCode + ''
    const reg = /^\d{6}\.([sS][hzHZ])?$/
    return !reg.test(StockCode)
}

// 检查日期是否符合条件
function checkErrDate(data){
    return moment(data + '').format("YYYY-MM-DD")=='Invalid date'
}

// 检查费率是否符合条件
function checkErrFate(data){
    return data < 0 || data > 100
}

// 检查展期至和展期天数是否符合条件
function checkErrExtensionTerm(zhandate, Term){
    if(!checkNull(zhandate) && !checkNull(Term)){
        return true
    }else if(checkNull(zhandate) && checkNull(Term)){
        return true
    }else if(!checkNull(zhandate) && checkErrDate(zhandate)){
        return true
    }else if(Term>182||Term<2){
        return true
    }
    return false
}

//导出数据
function exportDataMethod(id, name) {
    var xlsxParam = {
        raw: true,
    };
    let et = XLSX.utils.table_to_book(
        document.querySelector(id),
        xlsxParam
    );
    let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
    });
    try {
        FileSaver.saveAs(
        new Blob([etout], {
            type: "application/octet-stream",
        }),
        name + ".xlsx"
        );
    } catch (e) {
        console.log(e, etout);
    }
    return etout;
}

export default {
    checkNull,
    checkErrStockCode,
    checkErrDate,
    checkErrFate,
    exportDataMethod,
    checkErrExtensionTerm
}