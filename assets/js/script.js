// "https://api.fda.gov/drug/label.json?search=openfda.brand_name:(lipitor)&limit=1&skip=0?key="
var key = "WDvEG6qAQqMGjtjdhq5qhkDjQA6x4UeG9uuzPauc";
var brandName;
var genericName;
var reactions;
var drugAbuse;
var precautions;
var route;
var headline;
var snippet;
var nytLink;
var headline1;
var snippet1;
var nytLink1;
var headline2;
var snippet2;
var nytLink2;
var headline3;
var snippet3;
var nytLink3;


$("#search-form").on("submit", function (e) {
    e.preventDefault();
    var drug = $("#userSearch").val().trim()
    localStorage.clear();
    localStorage.setItem("search", drug);
    window.location.href = "search.html";
})



var homeurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
homeurl += '?' + $.param({
    'api-key': "74cc9f75faa54dd68a9249b2d0fe62e1",
    'fq': "headline.search:" + "medicine",
    'sort': "newest"
});
$.ajax({
    url: homeurl,
    method: 'GET',
}).then(function (e) {
    console.log(e);
    $(".cardContent").show();
    $(".loadingCard").hide();

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var randomNumber1 = randomIntFromInterval(0, 2)
    var randomNumber2 = randomIntFromInterval(3, 6)
    var randomNumber3 = randomIntFromInterval(7, 9)

    var headline1 = e.response.docs[randomNumber1].headline.main;
    var snippet1 = e.response.docs[randomNumber1].snippet;
    var nytLink1 = e.response.docs[randomNumber1].web_url;
    $("#header-1").html(headline1);
    $("#para-1").html(snippet1)
    var headline2 = e.response.docs[randomNumber2].headline.main;
    var snippet2 = e.response.docs[randomNumber2].snippet;
    var nytLink2 = e.response.docs[randomNumber2].web_url;
    $("#header-2").html(headline2);
    $("#para-2").html(snippet2)
    var headline3 = e.response.docs[randomNumber3].headline.main;
    var snippet3 = e.response.docs[randomNumber3].snippet;
    var nytLink3 = e.response.docs[randomNumber3].web_url;
    $("#header-3").html(headline3);
    $("#para-3").html(snippet3)


    $("#card-1").on("click", function (e) {
        window.open(nytLink1, "_blank");
    })

    $("#card-2").on("click", function (r) {
        window.open(nytLink2, "_blank");
    })

    $("#card-3").on("click", function (t) {
        window.open(nytLink3, "_blank");
    })

})


var healthurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
healthurl += '?' + $.param({
    'api-key': "29682e6e1b2e47189cfaa9a29501b31a",
    'fq': "headline.search:" + "health",
    'sort': "newest"
});
$.ajax({
    url: healthurl,
    method: 'GET',
}).then(function (e) {
    console.log(e);
    $(".cardContent").show();
    $(".loadingCard").hide();

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var healthNumber1 = randomIntFromInterval(0, 2)
    var healthNumber2 = randomIntFromInterval(3, 6)
    var healthNumber3 = randomIntFromInterval(7, 9)


    var headline4 = e.response.docs[healthNumber1].headline.main;
    var snippet4 = e.response.docs[healthNumber1].snippet;
    var nytLink4 = e.response.docs[healthNumber1].web_url;
    $("#header-4").html(headline4);
    $("#para-4").html(snippet4)
    var headline5 = e.response.docs[healthNumber2].headline.main;
    var snippet5 = e.response.docs[healthNumber2].snippet;
    var nytLink5 = e.response.docs[healthNumber2].web_url;
    $("#header-5").html(headline5);
    $("#para-5").html(snippet5)
    var headline6 = e.response.docs[healthNumber3].headline.main;
    var snippet6 = e.response.docs[healthNumber3].snippet;
    var nytLink6 = e.response.docs[healthNumber3].web_url;
    $("#header-6").html(headline6);
    $("#para-6").html(snippet6)

    $("#card-4").on("click", function (t) {
        window.open(nytLink4, "_blank");
    })

    $("#card-5").on("click", function (t) {
        window.open(nytLink5, "_blank");
    })
    $("#card-6").on("click", function (t) {
        window.open(nytLink6, "_blank");
    })

})

$("#nav-left").on("click", function () {
    document.location.href = "index.html"
})