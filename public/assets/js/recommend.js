
//获取热门推荐
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(res) {
        // console.log(res);
        var recommendtem = `
        {{each list}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <img src="{{$value.thumbnail}}" alt="">
              <span>{{$value.title}}</span>
            </a>
          </li>
          {{/each}}
        `
        let html = template.render(recommendtem, {list: res});
        $('#recommendTpl').html(html);
    }
})