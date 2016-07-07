define(function (require) {

    var $ = require('jquery');
    var waterfall = require('app/waterfall');

    waterfall.imgLocation();

    $(window).resize(function(event) {
    	waterfall.imgLocation();
    });

    $(window).scroll(function(event) {
    	if(waterfall.isAddImg()){
    		waterfall.addImg();
    	}
    });
});
