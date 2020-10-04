
$("#box2 > div:gt(0)").hide();
    
setInterval(function() { 
$('#box2 > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#box2');
},  3000);



$('button').on('click', function(){
    if (  document.getElementById("slider").style.display == "block"){
        document.getElementById("slider").style.display = "inline"
    }
    else{
        document.getElementById("slider").style.display = "block"
    }

$('#slider').toggleClass('open');

})