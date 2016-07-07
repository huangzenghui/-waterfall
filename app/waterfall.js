define(function (require) {
    var $ = require('jquery');
    var margin = 10; //图片间距

    function imgLocation() {
        /**
         * 图片的位置
         */
        var item = $(".item"); //获取item
        var itemWidth = item[0].offsetWidth + margin; //获取每个item实际宽度
        var itemHeightArr = []; //item高度的数组
        var num = document.documentElement.offsetWidth / itemWidth | 0; //一行可以放几个item
        $(".container").css('width', (itemWidth * num));
        for (var i = 0; i < item.length; i++) {
            itemHeight = item[i].offsetHeight; //item高度
            if (i < num) { //一行最多num个item，第一行top为0
                itemHeightArr[i] = itemHeight;
                item.eq(i).css("top", 0);
                item.eq(i).css("left", i * itemWidth); 
            } else {
                minHeight = Math.min.apply(null, itemHeightArr); //取得item中最小高度
                minIndex = $.inArray(minHeight, itemHeightArr); //最小高度的值对应的位置
                itemHeightArr[minIndex] += itemHeight + margin; //更新当前最小高度的高度
                item.eq(i).css("top", minHeight + margin);
                item.eq(i).css("left", minIndex * itemWidth);
            }
            $("p").eq(i).text("图片：" + i);
        }
        var maxHeight = Math.min.apply(null, itemHeightArr); //获取item中最大的高度
        var widowHeight = $(window).height(); //窗体高度
        if(maxHeight < widowHeight){ // 图片不满屏就再加载图片
            addImg();
        }
    }

    //是否需要加载图片
    function isAddImg(){
        /**
         * 当滚动到最后一个图片的一半的时候就需要加载图片
         */
        var item = $(".item");
        var lastItemHeight = item.last().get(0).offsetTop + Math.floor(item.last().height()/2); 
        var widowHeight = $(window).height();
        var scrollHeight = $(window).scrollTop();
        return (lastItemHeight < scrollHeight + widowHeight) ? true : false;
    }

    var imgs = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'];
    var imgLength = imgs.length;

    function addImg() {
        /**
         加载图片
         */
        for(var i = 0; i < imgLength; i++){
            var item = $("<li>").addClass("item").appendTo($(".container"));
            $("<img>").attr("src","imgs/"+imgs[i]).appendTo(item);
            $("<p>").appendTo(item);
        }
        imgLocation();
    }

    return {
        imgLocation : imgLocation,
        isAddImg: isAddImg,
        addImg: addImg
    };
});