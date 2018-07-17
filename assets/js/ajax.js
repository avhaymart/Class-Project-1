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
var genName;
$( document ).ready(function() {
    var drugName= localStorage.getItem("search");
    
    drugSearch(drugName);
});

$("#searchBtn").on("click", function(click){
    click.preventDefault();
    localStorage.clear();
    var newSearch= $("#userSearch").val();
    localStorage.setItem("search", newSearch);
    var newDrugName = localStorage.getItem("search")
    drugSearch(newDrugName);
});

    function drugSearch(search) {
        var fdaurl = "https://api.fda.gov/drug/label.json?search=openfda.brand_name:(" + search + ")&limit=1&skip=0?key=" + key;
        
        $.ajax({
            url: fdaurl,
            method: 'GET',
        }).then(function (res) {
            console.log(res)
            brandName = res.results[0].openfda.brand_name[0];
            genericName = res.results[0].openfda.generic_name[0];
            reactions = res.results[0].adverse_reactions[0];
            drugAbuse = res.results[0].drug_abuse_and_dependence[0];
            precautions = res.results[0].precautions[0];
            route = res.results[0].openfda.route[0];
            
            genName = (brandName + "(" + genericName + ")");
            console.log(reactions);
            console.log(drugAbuse);
            console.log(precautions);
            console.log(route);
            
            
            $result = $("<div>");
            $result.addClass("result");
            
            $resultHeading = $("<h3>");
            $resultHeading.addClass("resultHeading");
            
            $resBrand = $("<span>");
            $resBrand.addClass("resultBrand");
            
            $resGen = $("<span>");
            $resGen.addClass("resultGeneric");
            
            $acord = $("<div>");
            $acord.addClass("accordion");
            
            $resEffects = $("<h3>" + "Effects" + "</h3>");
            $resEffectsDiv = $("<div>");
            $resEffectsDiv.addClass("resultSideEffect");
            
            $reactions = $("<h3>" + "Reactions" + "</h3>");
            $reactionsDiv = $("<div>");
            $reactionsDiv.addClass("resultReactions");
            $resPrec = $("<h3>" + "Precautions" + "</h3>");
            $resPrecDiv = $("<div>");
            $resPrecDiv.addClass("resultsPrecautions");
            
            $resDir = $("<h3>" + "Ingestion/Use" + "</h3>");
            $resDirDiv = $("<div>");
            $resDirDiv.addClass("resultDirections");
            
            var shortReac = reactions.split(" ", 50);
            var joinReac = shortReac.join(" ");

            var shortPrec = precautions.split(" ", 50);
            var joinPrec = shortPrec.join(" ");
            
            var shortAbuse = drugAbuse.split(" ", 50);
            var joinAbuse = shortAbuse.join(" ");
            

            $resBrand.text(genName);
            $resEffectsDiv.text(joinReac);
            $reactionsDiv.text(joinPrec);
            $resPrecDiv.text(joinAbuse);
            $resDirDiv.text(route);
            
            $acord.append($resEffects);
            $acord.append($resEffectsDiv)
            
            $acord.append($reactions);
            $acord.append($reactionsDiv);
            
            $acord.append($resPrec);
            $acord.append($resPrecDiv);
            
            $acord.append($resDir);
            $acord.append($resDirDiv);
            
            $resultHeading.append($resBrand);
            $resultHeading.append($resGen);
            
            $result.append($resultHeading);
            $result.append($acord);
            
            
            
            $("#searchResults").prepend($result);
            $(".accordion").accordion();
            
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
        
        
        

            
     