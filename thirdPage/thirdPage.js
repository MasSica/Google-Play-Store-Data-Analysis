download=null;
Category=null;
rating=null;
version=null;
Size=null;
Size1=null;
download1=null;
rating1=null;
num=1;

const mean = arr =>arr.reduce( (p,c) => +p + (+c),0)/arr.length;
function plotGraphThirdPage(data)
{
 //plot Size-Rating-Categories of Version
    puntiRating=[];
    tracksRS=[];
    Sizemedio={};
    Vecategories=["0-5.0","5.0-15.0",">15.0"];
    veIntervalli=[0,5,15,100];

    for(let i=0;i<Vecategories.length;i++)
    {
        Size=_.flatMap(data.filter(a => a["Current Ver"]>=veIntervalli[i]&& a["Current Ver"]<veIntervalli[i+1]), s => s.Size_Mega);
        Rating = _.flatMap(data.filter(a =>a["Current Ver"]>=veIntervalli[i]&& a["Current Ver"]<veIntervalli[i+1]), s => s.Rating);    //filter(s => s <= 100);

        tracksRS[i] = {
            x: Rating, y: Size,
            type: "scatter ",
            mode: "markers",
            marker:{
                size: 6,

                opacity: (i==2?1:0.6)

            },
            name: Vecategories[i],
        };
    }
    //Plot line Size-Rating
    for(let j=0;j<=40;j++) {

        Sizemedio = mean(_.flatMap(data.filter(a=>+a.Rating==num),s=>s.Size_Mega));
        puntiRating.push(num);
        num+=0.1;
    }
    vet=[0];
   tracksRS[Vecategories.length]={
        x:vet,  y:vet,
        type: "scatter",
        mode: "markers",
        marker:{
            size:6,
            color: '#E2E2E2' },
            name: "Versions"
            };
     tracksRS[Vecategories.length+1]={
          x:puntiRating,y:Sizemedio,
         mode: 'lines+markers',
         name: 'Average Size - Rating',
         line: {shape: 'spline',color:"purple",
         opacity:0.1},
         type: 'scatter'
     };



    var layoutRS={ /*title: "Rating-Size-Versioni aggregate",*/
        yaxis:{title:"Size" ,range:[0,120]},
        xaxis:{title:"Rating",range:[0.8,5.3]},
        legend: {
            x: 0.05,
            y: 1,
            traceorder: 'reversed',
            font: {
                family: 'sans-serif',
                size: 12,
                color: '#000'
            },
            bgcolor: '#E2E2E2',
            bordercolor: 'WhiteSmoke',
            borderwidth: 0
        },
        height:350 ,
        margin:{
            l	:	90,
            r	:	60,
            t	:	40,
            b	:	40,
            pad	: 10
        }};
     Plotly.newPlot("Rating-Size",tracksRS,layoutRS);












 //plot Bar Graph Category Size - Installs(Download)
    downloadM=[];
    valueR=[];
    ClassiSize=[0,20,40,60,80,100];
    Sizecat=['0-20 MB','20-40 MB','40-60 MB','60-80 MB','80-100 MB'];
             for(let i=0;i<ClassiSize.length;i++)
             {
                 downloadM[i]=mean(_.flatMap(data.filter(a=>a.Size_Mega>=ClassiSize[i] && a.Size_Mega<ClassiSize[i+1]),s=>s.Installs));

                 valueR[i]=mean(_.flatMap(data.filter(a=>a.Size_Mega>=ClassiSize[i] && a.Size_Mega<ClassiSize[i+1]),s=>s.Rating));
             }


              valore=mean(_.flatMap(data,s=>s.Installs));
    let rep = function(x,n){
        let res = [];
        for(let i=0; i<n; ++i) res.push(x);
        return res;
    }

     xref = rep(valore,Sizecat.length);


                //Plot Average Line
    tracksDS=[{x:xref,y:Sizecat,line:{color:"darkorange",dash:"dash"},type:"scatter",mode:"lines",hoverinfo:"none"},
               { x: downloadM,y: Sizecat,

            type: "bar",
               orientation:'h',
               marker :{
               width: 2,
               opacity: 1,
                   color: 'lightgreen'
               }
    },{
        x:valueR,y:Sizecat,
            xaxis:'x2',
            type: "bar",
            orientation:'h',
            marker :{
                width: 5,
                opacity: 0.6,
                color: 'lightgreen'
            }
        }];

    layoutDS={
        xaxis:{title:"Download",domain:[0.45,1]},
        xaxis2:{title:"Rating",autorange: 'reversed',domain:[0,0.45]},
        yaxis:{position:0.4},
        hovermode: "y",
        height : 350,
        width: 600,
        margin:{
            l	:   40,
            r	:	0,
            t	:	60,
            b	:	60,
            pad	: 10
        },
        annotations:[{
            text:"Total Average Download=6.902.186 ",font:{color:"darkorange"},
            arrowcolor:"darkorange",
            x:valore,y:Sizecat[0],
            ax:80,ay:20,
        }],
        showlegend: false
        /*barmode: 'group',
        bargap: 0.1,
        bargroupgap: 0*/


    };

    layoutDS.annotations.push({
        x: downloadM[3],
        y: Sizecat[3],
        text: downloadM[3].toFixed(0),
        xanchor: 'right',
        showarrow: false,
        font: {color: 'white'}
    });//Add Direct label data
   /*for(let i=0; i<Sizecat.length; ++i) {

            str = valueR[i].toFixed(2);

            str = downloadM[i].toFixed(2);

        layoutDS.annotations.push({
            x: downloadM[i],
            y: Sizecat[i],
            text: str,
            xanchor: 'right',
            showarrow: false,
            font: {color: 'black'}
        });
    } */
       /* for(let i=0; i<Sizecat.length; ++i){

                str=valueR[i].toFixed(2);

            layoutDS.annotations.push({
                x:0,
                y: Sizecat[i],
                xshift:-70,
                text: str,
                xanchor:'center',
                showarrow:false,
                font: {color:'black'}
            });
    }*/


    plot1=Plotly.newPlot("Download-Size",tracksDS,layoutDS/*,{displayModeBar: false}*/);







//  Plot Rating-Version- Categories of Download
    tracks=[];

    Dlcategories=["0-10K","10K-1M","1M-100M","100M-1B"];
    Intervalli=[0,10000,1000000,100000000,1000000000];
    for(let i=0;i<Dlcategories.length;i++)
    {
        rating1 = _.flatMap(data.filter(a => a.Installs>=Intervalli[i]&& a.Installs<Intervalli[i+1]), s => s.Rating);
        version1 = _.flatMap(data.filter(a =>a.Installs>=Intervalli[i]&& a.Installs<Intervalli[i+1]), s => s["Current Ver"]).filter(s => +s <= 100);
        tracks[i] = {
            x: rating1, y: version1,
            type: "scatter ",
            mode: "markers",
            marker:{
                size: 6,
                opacity: 0.6*(i==2?0.5:1)
            },
            name: Dlcategories[i],

        };
    }
    vet=[0];
   tracks[Dlcategories.length]={
        x:vet,  y:vet,
        type: "scatter",
        mode: "markers",
        marker:{
            size:6,
            color: '#E2E2E2' },
        name: "Download"
    };

    var layout={ /*: "Versioni-Rating- Download aggregati",*/
        yaxis:{title:"Version" ,range:[0,100]},
        xaxis:{title:"Rating",range:[0.8,5.3]},

        legend: {
            x: 0.05,
            y: 1,
            traceorder: 'reversed',
            font: {
                family: 'sans-serif',
                size: 12,
                color: '#000'
            },
            bgcolor: '#E2E2E2',
            bordercolor: 'WhiteSmoke',
            borderwidth: 0
        },
        height:350 ,
        margin:{
            l	:	90,
            r	:	60,
            t	:	40,
            b	:	40,
            pad	: 10
        }
    };
    Plotly.newPlot("rating-version",tracks,layout);








    // Plot Current-Installs(Scala log)


        download = _.flatMap(data.filter(a=>a.Installs>100),s=>s.Installs);
        version = _.flatMap(data.filter(a=>a.Installs>100),s=>s["Current Ver"]).filter(s => s <= 100);
       tracks1= [{
            x: version, y: download,
            type: "scatter ",
            mode: "markers",
            marker:{
                size: 5,
                color: 'darkorange',
                opacity: 0.9
            } }] ;






    var layout1={ /*title: " Graph Download-Version",*/
        xaxis:{title:"Version" ,range:[0,75]},
        yaxis:{title:"Download",type:"log"},
        autosize: true ,
        margin :{
        autoexpand:true
        },
        height:350 ,
        margin:{
            l	:	90,
            r	:	70,
            t	:	40,
            b	:	40,
            pad	: 10
        }
    };
        Plotly.newPlot("download-version",tracks1,layout1);






}