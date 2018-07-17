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
$( document ).ready(function() {
    var drugName= localStorage.getItem("search")
    drugSearch(drugName);
});

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
    
    
    // $("form").on("submit", function (e) {
    //     e.preventDefault();
    //     var drug = $("#userSearch").val().trim()
    //     localStorage.clear();
    //     localStorage.setItem("search", drug);
    //     var drugName= localStorage.getItem("search")
    //     console.log(drugName + "asdfasdfasdfsad");
    //     drugSearch(drugName);
    // }).then(function (foofoo) {
    //     window.location.href= "search.html";
    //      });
        
        
        

            
     