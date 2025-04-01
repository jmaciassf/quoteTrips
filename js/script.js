$(document).ready(function(){
    console.log("ready");

    var availableTags = [
        "Monterrey",
        "CDMX",
        "Guadalajara",
        "Merida",
        "Saltillo",
        "Tijuana",
        "Tulum"
    ];
    $("#txtOrigin, #txtDestination").autocomplete({
        source: availableTags, 
        minLength: 0,
        select: function(e, term, item){
            console.log("onSelect");
            setTimeout(function(){            
                quote();
            }, 100);
       }
    }).focus(function () {
        $(this).val("");
        $(this).autocomplete('search', "");
    });

    $(".btnGoToCall").click(function(){
      call();  
    });

    $(".header .menu").click(function(){
        console.log("show menu");
        $("body").addClass("showMenu");
    });
    $(".divMenu .close").click(function(){
        hideMenu();
    });
    
    resize();

    
if(window.outerWidth >= 900){ // this is important
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        if(scrollTop > positions.aboutUs)
        {
            // Show reserve
            if(!$(".divAboutUs").hasClass("show")){
                $(".divAboutUs").addClass("show");
            }
            hideSection2();
        }
        else if(scrollTop > positions.reserve)
        {
            // Show reserve
            if(!$(".divReserve").hasClass("show")){
                $(".divReserve").addClass("show");
            }
        }
        else if(scrollTop > positions.section2)
        {
            // Show section2
            if(!$(".divSection2").hasClass("show")){
                $(".divSection2").addClass("show");
                startCarousel();
            }
            hideAboutUs();
        }
        else 
        {
            hideSection2();
            if($(".divReserve").hasClass("show")){
                $(".divReserve").removeClass("show");
            }
            hideAboutUs();
        }
    
        function hideSection2() {
            if($(".divSection2").hasClass("show")){
                $(".divSection2").removeClass("show");
                stopCarousel();
            }
        }
        function hideAboutUs() {
            if($(".divAboutUs").hasClass("show")){
                $(".divAboutUs").removeClass("show");
            }
        }
    });
}
else {
    $("body").addClass("mobile");
}
});

$(window).on("resize", function() {
    resize();
});


let positions = {}
function resize() {    
    
}

function call(){
    
}

function hideMenu(){
    console.log("hide menu");
    $("body").removeClass("showMenu");
}

function goTo(section){
    console.log("goTo");
    switch(section){
        case "aboutUs":
            location.href = "#divAboutUs";
            break;

        case "ourProcess":
            location.href = "#divReserve";
            break;
    }

    hideMenu();

    let minus = 70;
    if(window.outerWidth > 900){
        // Desktop
        minus = 50;
    }
    $("body").scrollTop($("body").scrollTop() - minus);
}

function quote(){
    console.log("quote");
    let origin = $("#txtOrigin").val();
    let destination = $("#txtDestination").val();
    if(!origin || !destination){
        $("#divResult").hide();
        return;
    } 

    $("#divResult").show();
    const total = randomIntFromInterval(10000, 80000);
    $("#lblTotal").html(numberWithCommas(total));
}

function schedule(){
    console.log("schedule");
    let origin = $("#txtOrigin").val();
    let destination = $("#txtDestination").val();
    window.open("https://api.whatsapp.com/send/?phone=8118216505&text=Quisiera%20agendar%20un%20viaje:%0a%0aInicio: "+origin+"%0aDestino:%20"+destination+"%0aFecha de inicio: " + new Date().toLocaleDateString() + "")
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}