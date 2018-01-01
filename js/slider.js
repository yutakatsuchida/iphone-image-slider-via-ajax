$(function() {

	const fullpath = 'http://xinkyo.firebird.jp/codepen/';

	// Initial Action
	$('#portBtm').addClass('active');
	$('#slider').html('<div id="loading"><img src="'+fullpath+'loading.gif'+'"></div>');
	ajaxAction();

	// Click Buttons
	const screenMode = $('#switch-mode dd a');
	screenMode.on('click', function(evt) {

		evt.preventDefault();
		$('#switch-mode dd a.active').removeClass('active');
		$(this).addClass('active');
		$('#slider').html('<div id="loading"><img src="' + fullpath + 'loading.gif' + '"></div>');
		ajaxAction();
	});

	//Function for ajax action
	function ajaxAction() {

		const loadFile = $('#switch-mode dd a.active').attr('href');

		$.ajax({
		    type: 'GET',
		    url: loadFile,
		    dataType: 'html'
		  }).done(function (data) {
		      const $html = $(data);
		      const $img = $('img', $html);
		      const imgNum = $img.length;
		      let count = 0;
		      let current;

		      console.log($img[0]);
		      console.log(imgNum);

		      for (var i = 0; i < imgNum; i++) {
		        const createImg = new Image(); // create a image
				console.log(createImg);	        
		        // image loaded
		        /*createImg.onload = function () {
		          count += 1;
		        }*/

		        $(createImg).error(function(){
		        	count += 1;
		        	console.log('error');
		        }).load(function(){
		        	count += 1;
		        	console.log('img loaded');
		        });

		        // fail to be loaded
		        /*createImg.onerror = function () {
		          count += 1;
		        }*/

		        createImg.src = $img[i].src;
		        console.log(count);
		      }

		      
		      const nowLoading = setInterval(function () {
		        // get percentage
		        current = Math.floor(count / imgNum * 100);
		        console.log(current)

		        // Every image has been loaded.
		        if (count == imgNum) {

		          // Ended loading function
		          clearInterval(nowLoading);
		          $('#slider').append($html);
		          $html.ready(function () {
		            $('#loading').remove();
		            $('#main-cont').fadeIn(1000);
		          });
		          sliderMotion();
		        }
		      }, 100);
           
		});
	}




	//function for slider action
	function sliderMotion() {
		const activeSwitch = $('#switch-mode dd a.active').attr('href').replace(
			'.html', '');
		let width;
		if (activeSwitch == 'portrait') {
			width = 340;
		} else {
			width = 612;
		}
		const slider = $('#slider');
		const sliderWrap = $('#slider ul');
		const sliderList = $('#slider ul li');
		const length = sliderList.length;
		slider.removeClass();
		slider.addClass(activeSwitch);
		sliderWrap.width(width * length);

		$('#slider ul li:last-child').prependTo('#slider ul');
		sliderWrap.css('margin-left', -width);
		const prevBtm = $('#sliderPrev');
		const nextBtm = $('#sliderNext');

		nextBtm.on('click', function() {
			sliderWrap.animate({
				'margin-left': '-=' + width
			}, 500, function() {
				$('#slider ul li:first-child').appendTo('#slider ul');
				sliderWrap.css('margin-left', -width);
			});
			return false;
		});

		prevBtm.on('click', function() {
			sliderWrap.animate({
				'margin-left': '+=' + width
			}, 500, function() {
				$('#slider ul li:last-child').prependTo('#slider ul');
				sliderWrap.css('margin-left', -width);
			});
			return false;
		});
	}
});