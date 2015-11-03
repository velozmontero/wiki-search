$(document).ready(function(){
   
   
    // CLEARABLE INPUT
    function tog(v){return v?'addClass':'removeClass';} 
        $(document).on('input', '.clearable', function(){
            $(this)[tog(this.value)]('x');
        }).on('mousemove', '.x', function( e ){
            $(this)[tog(this.offsetWidth-42 < e.clientX-this.getBoundingClientRect().left)]('onX');
        }).on('touchstart click', '.onX', function( ev ){
            ev.preventDefault();
            $(this).removeClass('x onX').val('').change();
            $('#result-container').addClass("hidden");
            $('#result').html("");
            $('#cont').addClass('vertical-center');
    });
    
    // $('.clearable').trigger("input");
    // Uncomment the line above if you pre-fill values from LS or server   
   
    function getResult() {
        var requestedInfo= document.getElementById("search");
        $.getJSON(
            "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=2&exlimit=10&exintro=&titles=Main%20Page&generator=search&gsrsearch="+requestedInfo.value+"&callback=?",
            function(res) {
                var pagesX= res.query.pages;
                for (var x in pagesX){
                     $('#result').append("<li>"+"<a>"+"<span class='links'>"+pagesX[x].title+"<br>"+pagesX[x].extract+"<br>"+"</span>"+"</a>"+"</li>")
                     console.log(pagesX[x].title);
                     console.log(pagesX[x].extract);
                }
            }  
        );
        console.log(requestedInfo.value);
    };
    
    $('#go').click(function(){
        $('#result').html("");
        getResult();
        $('#cont').removeClass('vertical-center');
        $('#result-container').removeClass("hidden");
        
    });
    
});