$(document).ready(function(){

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        }
        ,BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        }
        ,iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
        ,Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        }
        ,Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        }
        ,any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    (function(){

        function initHeading(){
            var h2 = [];
            var h3 = [];
            var h2index = 0;

            $.each($('.pre h2, .pre h3'),function(index,item){
                if(item.tagName.toLowerCase() == 'h2'){
                    var h2item = {};
                    h2item.name = $(item).text();
                    h2item.id = 'menuIndex'+index;
					$(item).addClass('h3');
                    h2.push(h2item);
                    h2index++;
                }else{
                    var h3item = {};
                    h3item.name = $(item).text();
                    h3item.id = 'menuIndex'+index;
					$(item).addClass('h4');
                    if(!h3[h2index-1]){
                        h3[h2index-1] = [];
                    }
                    h3[h2index-1].push(h3item);
                }
                item.id = 'menuIndex' + index;
            });

            return {h2:h2,h3:h3}
        }

        function genTmpl(){
            var h1txt = $('h1').text();
            var tmpl = '<div id="minitoc-area"><ul class="minitoc">';

            var heading = initHeading();
            var h2 = heading.h2;
            var h3 = heading.h3;

            for(var i=0;i<h2.length;i++){
                tmpl += '<li><a href="#" data-id="'+h2[i].id+'">'+h2[i].name+'</a>';

                if(h3[i]){
					tmpl += '<ul class="minitoc">';

                    for(var j=0;j<h3[i].length;j++){
                        tmpl += '<li><a href="#" data-id="'+h3[i][j].id+'">'+h3[i][j].name+'</a></li>';
                    }

					tmpl += '</ul>';
                }
				tmpl += '</li>';
            }
            tmpl += '</ul></div>';

            return tmpl;
        }

        function genIndex(){
            var tmpl = genTmpl();

            $('.pre h1').after($(tmpl));

            $('.pre').delegate('a','click',function(e){
                    e.preventDefault();

                    var selector = $(this).attr('data-id') ? '#'+$(this).attr('data-id') : 'h1'
                    var scrollNum = $(selector).offset().top;

                    $('body, html').animate({ scrollTop: scrollNum }, 400, 'swing');
                });
        }

		function editMenuPage(){
			var curTitle = $('title').text();

		}


        if($('.pre h2').length > 0 && !isMobile.any() ){
            genIndex();
        }
    })();

});
