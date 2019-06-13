/*
@author: Massimiliano Sica
 */

const mean = arr =>arr.reduce( (p,c) => +p + (+c),0)/arr.length;


    function plot_ratings_reviews(data){

        var nonzero = data.filter(d=>d.Price_dollar != 0);
        var zero = data.filter(d=>d.Price_dollar == 0);
        var rating_noz = nonzero.map(d=>d.Rating);
        var reviews_noz = nonzero.map(d=>d.Reviews);
        var rating_zer=  zero.map(d=>d.Rating);
        var reviews_zer= zero.map(d=>d.Reviews);



        var trace_free = {
            x: rating_zer, y: reviews_zer,
            type:"scatter",
            mode:"markers",
            name:"free apps",
            marker: {
                color: '#1B9908',
                size: 3,
                opacity:0.4,
            },
        };


        var trace_paid = {
            x:rating_noz, y: reviews_noz,
            type: "scatter",
            mode:"markers",
            name:"paid apps",
            marker: {
                color: '#2304EF',
                size: 4,
                line: {
                    color: 'darkblue',
                    width: 1,
                    opacity:0.4,
                }

            },

        };


        var layout = {

            xaxis: { title: "Rating"},
            yaxis: { title: "# Reviews",type:"log"},
            legend:{size: 13, color:'#444', orientation:'v'},
            hovermode: false,
            width:900, height:500,

        };



        var  traces=[trace_paid,trace_free];


        Plotly.newPlot("rating", traces, layout);

    }


function plot_ratings_download(data){


    var nonzero = data.filter(d=>d.Price_dollar != 0);
    var zero = data.filter(d=>d.Price_dollar == 0);
    var rating_noz = nonzero.map(d=>d.Rating);
    var download_noz = nonzero.map(d=>d.Installs);
    var rating_zer=  zero.map(d=>d.Rating);
    var download_zer= zero.map(d=>d.Installs);



    var trace_free = {
        x: rating_zer, y: download_zer,
        type:"scatter",
        mode:"markers",
        name:"free apps",
        marker: {
            color: '#1B9908',
            size: 4,
            opacity:0.4,
        },
    };

    var trace_paid = {
        x:rating_noz, y: download_noz,
        type: "scatter",
        mode:"markers",
        name:"paid apps",
        marker: {
            color: '#2304EF',
            size: 6,
            opacity: 0.7,

        },

    };

    var layout = {

        xaxis: { title: "Rating"},
        yaxis: { title: "# Installs",type:"log"},
        legend:{size: 13, color:'#444', orientation:'v'},
        hovermode: false,
        width:900, height:500,


    };



   var  traces=[trace_paid,trace_free];
    Plotly.newPlot("installs", traces, layout);

}

function plot_ratings_size(data){


    var nonzero = data.filter(d=>d.Price_dollar != 0);
    var zero = data.filter(d=>d.Price_dollar == 0);
    var rating_noz = nonzero.map(d=>d.Rating);
    var size_noz = nonzero.map(d=>d.Size_Mega);
    var rating_zer=  zero.map(d=>d.Rating);
    var size_zer= zero.map(d=>d.Size_Mega);




    var trace_free = {
        x: rating_zer, y: size_zer,
        type:"scatter",
        mode:"markers",
        name:"free apps",
        marker: {
            color: '#1B9908',
            size: 4,
            opacity:0.4,
        },
    };

    var trace_paid = {
        x:rating_noz, y: size_noz,
        type: "scatter",
        mode:"markers",
        name:"paid apps",
        marker: {
            color: '#2304EF',
            size: 6,

        },

    };

    var layout = {

        xaxis: { title: "Rating"},
        yaxis: { title: "Size_Mega"},
        legend:{size: 13, color:'#444', orientation:'v'},
        hovermode: false,
        width:900, height:500,


    };



    var traces=[trace_paid,trace_free];
    Plotly.newPlot("size", traces, layout);

}



function plot_ratings_price(data){


    Price=[];
    classize=[1,1.5,2,2.5,3,3.5,4,4.5,5];
    sizecat=["1-1.5","1.5-2","2-2.5","2.5-3","3-3.5","3.5-4","4-4.5","4.5-5"];
    for(let i=0;i<classize.length-1;++i){
        Price[i]=mean(_.flatMap(data.filter(d=>d.Rating>=classize[i]&& d.Rating<classize[i+1]&& d.Price_dollar!=0),s=>s.Price_dollar));
    }


    var trace = {

        x: sizecat, y: Price,
        type: "bar",
        marker: {
            color: 'greeen',
            size: 6,
            opacity: 0.6,

        },
    };

    var layout = {

        xaxis: { title: "Rating"},
        yaxis: { title: "Price(USD)"},
        width:900, height:500,
    };


    Plotly.plot("price", [trace], layout);


}


