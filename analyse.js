var analyse = function(data) {
    data = data.rows
    var cost_res = cost_analyse(data);
    var bf_res = breakfast_analyse(data);

    return {
        cost_res: cost_res,
        bf_res: bf_res
    }
}

var cost_analyse = function(data) {
    var cost = 0; // cost fee
    var charge = 0; // charge fee
    var costEle = 0; // electric fee
    var costCnt = data.length

    var maxCost = 0
    var maxCharge = 0

    for(var i = 0; i < costCnt; ++i) {
        tranamt = data[i].TRANAMT;
        trancode = data[i].TRANCODE;
        place = data[i].MERCNAME;
        if (tranamt < 0) {
            cost -= tranamt;
            maxCost = Math.max(maxCost, -tranamt);
        } else if (trancode != '22') {
            charge += tranamt;
            maxCharge = Math.max(maxCharge, tranamt);
        }
        if (place.indexOf('电控') >= 0) {
            costEle -= tranamt;
        }
    }
    cost = cost.toFixed(2);
    costEle = costEle.toFixed(2);
    charge = charge.toFixed(2);
    maxCost = maxCost.toFixed(2);
    maxCharge = maxCharge.toFixed(2);
    return {
        'costCnt': costCnt,
        'cost': cost,
        'costEle': costEle,
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
        place.indexOf('超市') >= 0 || place.indexOf('点心') >= 0)) {
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

module.exports = analyse;
