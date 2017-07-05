var analyse = function(data) {
    var ui_num = document.getElementById('num');
    var ui_cost = document.getElementById('cost');
    var ui_charge = document.getElementById('charge');
    var cost = 0;
    var charge = 0;

    for(var i = 0; i < data.length; ++i) {
        tranamt = data[i].TRANAMT;
        trancode = data[i].TRANCODE;
        if (tranamt < 0) {
            cost -= tranamt;  
        } else if (trancode != '22') {
            
                charge += tranamt;
        }
    }

    cost = cost.toFixed(2);
    charge = charge.toFixed(2);

    ui_num.innerText = data.length.toString();
    ui_cost.innerText = cost.toString();
    ui_charge.innerText = charge.toString();
}
