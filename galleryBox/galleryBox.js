$(document).ready(function () {
    /*$(".galeri img").click(function (){
        var height = $("body").height();
        var src = $(this).attr("src");
        $("body").append("<div id='lightbox'></div>");
        $("#lightbox").css({height:height});
        $("body").append("<img id='imgR' src='"+src+"'/>");
    })*/
    var nowIndex;
    $(window).resize(function(){
        resize();
    })
    $(".galleryBox").on("click","img",function (){
        var height = $("body").height();
        var src = $(this).attr("src");
        nowIndex = $(this).index();
        $("body").append("<div id='lightbox'></div>");
        $("#lightbox").css({height:height});
        $("body").append("<img id='leftArrow' class='arrow' src='./galleryBox/left.png'><img id='imgR' src='"+src+"'/><img id='rightArrow' class='arrow' src='./galleryBox/right.png'>");
        resize();
    })
    $("body").on("click","#leftArrow",function (){
        if(nowIndex>0){
            nowIndex--;
        }
        var src = $(".galleryBox img").eq(nowIndex).attr("src");
        $("#imgR").attr("src",src);
        resize();
    })
    $("body").on("click","#rightArrow",function (){
        var lastIndex = $(".galleryBox img").last().index();
        if(nowIndex<lastIndex){
            nowIndex++;
        }
        var src = $(".galleryBox img").eq(nowIndex).attr("src");
        $("#imgR").attr("src",src);
        resize();
    })
    $("body").on("click","#lightbox",function (){
        $("#lightbox").remove();
        $("#imgR").remove();
        $("#leftArrow").remove();
        $("#rightArrow").remove();
    })

}) 

   function resize(){
        var height = $("#imgR").height();
        var width = $("#imgR").width();
        $("#imgR").css({marginTop:-height/2,marginLeft:-width/2});
    }

