var analyse = function(data) {

    // 1. cost analyse
    var ui_costCnt = document.getElementById('costCnt');
    var ui_cost = document.getElementById('cost');
    var ui_charge = document.getElementById('charge');
    var ui_maxCost = document.getElementById('maxCost');
    var ui_maxCharge = document.getElementById('maxCharge');

    var cost_res = cost_analyse(data);
    ui_costCnt.innerText = cost_res.costCnt.toString();
    ui_cost.innerText = cost_res.cost.toString();
    ui_charge.innerText = cost_res.charge.toString();
    ui_maxCost.innerText = cost_res.maxCost.toString();
    ui_maxCharge.innerText = cost_res.maxCharge.toString();

    // 2. breakfast analyse
    var ui_dateCnt = document.getElementById('dateCnt');
    var ui_bfCnt = document.getElementById('bfCnt');
    var ui_minbftime = document.getElementById('minbftime');
    var ui_maxbftime = document.getElementById('maxbftime');

    var bf_res = breakfast_analyse(data);
    ui_dateCnt.innerText = bf_res.dateCnt.toString();
    ui_bfCnt.innerText = bf_res.bfCnt.toString();
    ui_minbftime.innerText = bf_res.minbftime.toString();
    ui_maxbftime.innerText = bf_res.maxbftime.toString();

}

var cost_analyse = function(data) {
    var cost = 0;
    var charge = 0;
    var costCnt = data.length

    var maxCost = 0
    var maxCharge = 0

    for(var i = 0; i < costCnt; ++i) {
        tranamt = data[i].TRANAMT;
        trancode = data[i].TRANCODE;
        if (tranamt < 0) {
            cost -= tranamt;
            maxCost = Math.max(maxCost, -tranamt);
        } else if (trancode != '22') {
            charge += tranamt;
            maxCharge = Math.max(maxCharge, tranamt);
        }
    }
    cost = cost.toFixed(2);
    charge = charge.toFixed(2);
    return {
        'costCnt': costCnt,
        'cost': cost,
        'charge': charge,
        'maxCost': maxCost,
        'maxCharge': maxCharge
    }
}

var breakfast_analyse = function(data) {

    const BF_EARLIST_TIME = '04:00:00'
    const BF_LATEST_TIME = '10:00:00'
    var costCnt = data.length
    var dateMap = {}
    var bfMap = {}
    var min_bf_time = BF_LATEST_TIME
    var max_bf_time = BF_EARLIST_TIME

    for(let i = 0; i < costCnt; ++i) {
        var date = data[i].OCCTIME.split(' ')[0]
        var time = data[i].OCCTIME.split(' ')[1]
        var place = data[i].MERCNAME
        if (dateMap[date]) {
            dateMap[date]++;
        } else {
            dateMap[date] = 1;
        }
        // check if it is breakfast
        if (time >= BF_EARLIST_TIME && time <= BF_LATEST_TIME &&
        (place.indexOf('苑') >= 0 || place.indexOf('餐') >= 0 ||
        place.indexOf('超市') >= 0)) {
            bfMap[date]++;
            if (time < min_bf_time) min_bf_time = time;
            if (time > max_bf_time) max_bf_time = time;
        }
    }
    return {
        'dateCnt': Object.keys(dateMap).length,
        'bfCnt': Object.keys(bfMap).length,
        'minbftime': min_bf_time,
        'maxbftime': max_bf_time
    }
}
