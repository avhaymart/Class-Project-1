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
var purpose;
var warnings;
var whenUse;
var $resBrand
var $resGen
var $resReaction
var $resReactiondDiv
var shortReac
var joinReac
var $resAbuse
var $resAbuseDiv
var shortAbuse
var joinAbuse
var $precaution
var $precautionDiv
var shortPrec
var joinPrec
var $resDir
var $resDirDiv
var $resPurpose
var $resPurposeDiv
var $resWhenUse
var $resWhenUseDiv
var $resWarnings
var $resWarningsDiv
var shortWarnings
var joinWarnings
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

            var $result = $("<div>");
            $result.addClass("result");
            
            var $resultHeading = $("<h3>");
            $resultHeading.addClass("resultHeading");
            
            var $acord = $("<div>");
            $acord.addClass("accordion");
            
            if(res.results[0].openfda.brand_name && res.results[0].openfda.generic_name){
                brandName = res.results[0].openfda.brand_name[0];
                genericName = res.results[0].openfda.generic_name[0];
                genName = (brandName + "(" + genericName + ")");
                console.log(brandName)
                $resBrand = $("<span>");
                $resBrand.addClass("resultBrand");
                $resBrand.text(genName);
            }
            if(res.results[0].adverse_reactions){
                reactions = res.results[0].adverse_reactions[0];
                console.log(reactions)
                $resReaction = $("<h3>" + "Effects" + "</h3>");
                $resReactionDiv = $("<div>");
                $resReactionDiv.addClass("resultSideEffect");
                shortReac = reactions.split(" ", 50);
                joinReac = shortReac.join(" ");
                $resReactionDiv.text(joinReac);
                $acord.append($resReaction);
                $acord.append($resReactionDiv);
            }
            if(res.results[0].drug_abuse_and_dependence){
                drugAbuse = res.results[0].drug_abuse_and_dependence[0];
                console.log(drugAbuse)
                $resAbuse = $("<h3>" + "Precautions" + "</h3>");
                $resAbuseDiv = $("<div>");
                $resAbuseDiv.addClass("resultsPrecautions");
                shortAbuse = drugAbuse.split(" ", 50);
                joinAbuse= shortAbuse.join(" ");
                $resAbuseDiv.text(joinAbuse);
                $acord.append($resAbuse);
                $acord.append($resAbuseDiv);
            }
            if(res.results[0].precautions){
                precautions = res.results[0].precautions[0];
                console.log(precautions)
                $precaution = $("<h3>" + "Reactions" + "</h3>");
                $precautionDiv = $("<div>");
                $precautionDiv.addClass("resultReactions");
                shortPrec = precautions.split(" ", 50);
                joinPrec = shortPrec.join(" ");
                $precautionDiv.text(joinPrec);
                $acord.append($precaution);
                $acord.append($precautionDiv);
            }
            if(res.results[0].purpose){
                purpose = res.results[0].purpose[0];
                console.log(purpose)
                $resPurpose = $("<h3>" + "Use" + "</h3>")
                $resPurposeDiv = $("<div>")
                $resPurposeDiv.addClass("resultDirections")
                $resPurposeDiv.text(purpose);
                $acord.append($resPurpose);
                $acord.append($resPurposeDiv);
            }
            if(res.results[0].when_using){
                whenUse = res.results[0].when_using[0];
                console.log(whenUse)
                $resWhenUse = $("<h3>" + "When Using" + "</h3>")
                $resWhenUseDiv = $("<div>")
                $resWhenUseDiv.addClass("resultDirections")
                $resWhenUseDiv.text(whenUse);
                $acord.append($resWhenUse);
                $acord.append($resWhenUseDiv)
            }
            if(res.results[0].warnings){
                warnings = res.results[0].warnings[0]
                console.log(warnings)
                $resWarnings = $("<h3>" + "Warnings" + "</h3>")
                $resWarningsDiv = $("<div>")
                $resWarningsDiv.addClass("resultDirections")
                shortWarnings = warnings.split(" ", 50);
                joinWarnings = shortWarnings.join(" ");
                $resWarningsDiv.text(joinWarnings);
                $acord.append($resWarnings);
                $acord.append($resWarningsDiv);
            }
            if(res.results[0].openfda.route){
                route = res.results[0].openfda.route[0];
                console.log(route)
                $resDir = $("<h3>" + "Ingestion/Use" + "</h3>");
                $resDirDiv = $("<div>");
                $resDirDiv.addClass("resultDirections");
                $resDirDiv.text(route);
                $acord.append($resDir);
                $acord.append($resDirDiv);
            }
            

            $resultHeading.append($resBrand);
            $resultHeading.append($resGen);

            $result.append($resultHeading);
            $result.append($acord);

            $("#searchResults").prepend($result);
            $(".accordion").accordion();
        })
        
    }