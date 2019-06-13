url = '../datasets/google_play_store_cleaned.csv';
data = null;

function hideSections(){
    $("#rating").hide();
    $("#installs").hide();
    $("#size").hide();
    $("#price").hide();
}
function plotGraphs(data){
    plot_ratings_reviews(data);
    plot_ratings_price(data);
    plot_ratings_size(data);
    plot_ratings_download(data)
}
window.onload = function () {
    getData(url, 10, function () {

        hideSections();
        plotGraphs(data);

        $("#show_rating").click(function(){
            $("#rating").toggle();
        });

        $("#show_inst").click(function(){
            $("#installs").toggle();
        });

        $("#show_size").click(function(){
            $("#size").toggle();
        });

        $("#show_price").click(function(){
            $("#price").toggle();
        });



    });


}

function  getData(url,n,callback) {
    $.get(url, function (csv) {
        data = $.csv.toObjects(csv);
        callback()
    });

}

