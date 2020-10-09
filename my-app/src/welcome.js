
$("#box2 > div:gt(0)").hide();
    
setInterval(function() { 
$('#box2 > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#box2');
},  3000);


