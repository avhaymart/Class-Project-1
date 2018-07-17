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

function drugSearch(search) {
    var fdaurl = "https://api.fda.gov/drug/label.json?search=openfda.brand_name:(" + search + ")&limit=1&skip=0?key=" + key;

    $.ajax({
        url: fdaurl,
        method: 'GET',
    }).then(function (res) {
        console.log(res)
        brandName = res.results[0].openfda.brand_name[0];
        genericName = res.results[0].openfda.generic_name[0]
        reactions = res.results[0].adverse_reactions
        drugAbuse = res.results[0].drug_abuse_and_dependence
        precautions = res.results[0].precautions
        route = res.results[0].openfda.route[0]

        console.log(brandName + "(" + genericName + ")");
        console.log(reactions)
        console.log(drugAbuse)
        console.log(precautions)
        console.log(route);

    })

    var nyturl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nyturl += '?' + $.param({
        'api-key': "29682e6e1b2e47189cfaa9a29501b31a",  
        'fq': "headline.search:" + search,
        'sort': "newest"
    });
    $.ajax({
        url: nyturl,
        method: 'GET',
    }).then(function (e) {
        console.log(e);
            for(var i = 0; i < e.response.docs.length; i++){
            var headline = e.response.docs[i].headline.main;
            var snippet = e.response.docs[i].snippet;
            var nytLink = e.response.docs[i].web_url;
            console.log(headline)
            console.log(snippet)
            console.log(nytLink)
        }
    })
}


$("form").on("submit", function (e) {
    e.preventDefault();
    var drug = $("#userSearch").val().trim()
    drugSearch(drug);
})



var homeurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
homeurl += '?' + $.param({
    'api-key': "29682e6e1b2e47189cfaa9a29501b31a",
    'fq': "headline.search:" + "medicine",
    'sort': "newest"
});
$.ajax({
    url: homeurl,
    method: 'GET',
}).then(function (e) {
    console.log(e);

        var headline1 = e.response.docs[0].headline.main;
        var snippet1 = e.response.docs[0].snippet;
        var nytLink1 = e.response.docs[0].web_url;
        $("#header-1").html(headline1);
        $("#para-1").html(snippet1)
        var headline2 = e.response.docs[1].headline.main;
        var snippet2 = e.response.docs[1].snippet;
        var nytLink2 = e.response.docs[1].web_url;
        $("#header-2").html(headline2);
        $("#para-2").html(snippet2)
        var headline3 = e.response.docs[2].headline.main;
        var snippet3 = e.response.docs[2].snippet;
        var nytLink3 = e.response.docs[2].web_url;
        $("#header-3").html(headline3);
        $("#para-3").html(snippet3)
        
        $("#card-1").on("click", function(e){
            window.open(nytLink1, "_blank");
            console.log("pee")
        })

        $("#card-2").on("click", function(r){
            window.open(nytLink2, "_blank");
            console.log("poo")
        })
        
        $("#card-3").on("click", function(t){
            window.open(nytLink3, "_blank");
            console.log("turd")
        })
    

})