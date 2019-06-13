url = '../datasets/google_play_store_cleaned.csv';
data = null;

window.onload = function () {
    getData(url,10,function () {
        $('#data').change(function () {
            let t = tableToHtmlElement(_.sampleSize(data,$(this).val()));
            $('#csv').html(t)
        });

        plotGraphThirdPage(data);



    });

};


function  getData(url,n,callback) {
    $.get(url,function (csv) {
        data = $.csv.toObjects(csv);
        // show first n values
        let table = tableToHtmlElement(_.sampleSize(data,n));
        $("#csv").html(table);
        callback()
    });

};

function tableToHtmlElement(data) {
    let res = document.createElement("table");
    res.setAttribute('cellspacing',0)
    let html = "<tr>";
    for (let h in data[0])
        if (data[0].hasOwnProperty(h))
            html += "<th>" + h + "</th>";
    html += "</tr>";
    for (let i = 0; i < data.length; ++i) {
        html += "<tr>";
        for (let f in data[i])
            if (data[i].hasOwnProperty(f))
                html += "<td>" + data[i][f] + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    res.innerHTML = html;
    return res;
};

