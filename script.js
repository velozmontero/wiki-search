$(document).ready(function(){
    
    var requestedInfo= document.getElementById("search");
         
    // CLEARABLE INPUT
    function tog(v){return v?'addClass':'removeClass';} 
        $(document).on('input', '.clearable', function(){
            
            $("#not-f").addClass("hidden");
            $('#search').removeClass('alert');
            if ($('#result').html()=="") {
                $('#cont').addClass('vertical-center');
            }
            
            $(this)[tog(this.value)]('x');
        }).on('mousemove', '.x', function( e ){
            $(this)[tog(this.offsetWidth-42 < e.clientX-this.getBoundingClientRect().left)]('onX');
        }).on('touchstart click', '.onX', function( ev ){
            ev.preventDefault();
            $(this).removeClass('x onX').val('').change();
            
            $('#result-container').addClass("hidden");
            $('#result').html("");
            $('#cont').addClass('vertical-center');
            $("#not-f").addClass("hidden");
    });
    
    // $('.clearable').trigger("input");
    // Uncomment the line above if you pre-fill values from LS or server   
   
    function getResult() {
        $.getJSON(
            "http://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&format=json&exsentences=2&exlimit=20&exintro=&inprop=url&titles=Main%20Page&generator=search&gsrsearch="+requestedInfo.value+"&callback=?",
            function(res) {
                if (!res.hasOwnProperty("query") ) {
                        $("#result-container").addClass("hidden");
                        if ( !($('#cont').hasClass('vertical-center')) ) {
                            $("#not-f").removeClass("hidden");
                            $('#cont').addClass('vertical-center');
                        }
                        else {
                            $("#not-f").removeClass("hidden");
                        }
                    }
                else{
                    $('#cont').removeClass('vertical-center');
                    $('#result-container').removeClass("hidden"); 
                    $("#not-f").addClass("hidden");
                    $('#search').removeClass('alert');
                    
                    var pagesX= res.query.pages;
                
                    for (var x in pagesX){   
                        $('#result').append("<li data-id='"+pagesX[x].pageid+"'>"+"<a target='_blank' href="+pagesX[x].fullurl+">"+"<span class='links'>"+pagesX[x].title+"<br>"+pagesX[x].extract+"<br>"+"</span>"+"</a>"+"</li>");
                        console.log(pagesX[x].title);
                        console.log(pagesX[x].pageid);
                        console.log(pagesX[x].extract);      
                    }    
                }
            }        
        );
        console.log(requestedInfo.value);
    };
    
    $('#search').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#go').click();//Trigger search button click event
        }
    });
    
    $('#go').click(function(){
        $('#result').html("");
        
        if (!requestedInfo.value) {
            $("#not-f").addClass("hidden");
            $('#search').addClass('alert');
            $('#result-container').addClass("hidden");
            $('#result').html("");
            $('#cont').addClass('vertical-center');
        }
        else{
            getResult();    
        }  
    });
    
    /*$("#result").on("click", "li", function(){
        
        var selectedLink= $(this).attr("data-id");
        console.log("selectedLink: "+selectedLink);
        
        $.getJSON(
            "http://en.wikipedia.org/w/api.php?action=query&prop=info&format=json&inprop=url&pageids="+selectedLink+"&callback=?",
            function(res) {
                console.log(res);
                var linkToGo= res.query.pages;
                for (var x in linkToGo){
                    console.log("fullurl: "+linkToGo[x].fullurl);
                    $(location).attr('href',linkToGo[x].fullurl);  
                }
            }        
        ); 
    });*/
    
});