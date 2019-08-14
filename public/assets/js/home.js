
//添加轮播图
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(res) {
        // console.log(res);
        let html = template('sliderTem', {list: res})
        $('#sliderBox').html(html);

        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
              // index++;
      
              $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
          });
      
          // 上/下一张
          $('.swipe .arrow').on('click', function () {
            var _this = $(this);
      
            if(_this.is('.prev')) {
              swiper.prev();
            } else if(_this.is('.next')) {
              swiper.next();
            }
          })
    }
});


//获取最新发布文章
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function(res) {
        // console.log(res);
        let html = template('newTpl', {list: res});
        $('.panel').append(html);
    }
})