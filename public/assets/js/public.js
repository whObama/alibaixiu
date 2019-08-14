// 从浏览器的地址栏中获取参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    //遍历数组
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] = name) {
            return tmp[1];
        }
    }
    return -1;
}

// 获取随机数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(res) {
        // console.log(res);
        let publicTLp = `
        {{each list}}
        <li>
        <a href="detail.html?id={{@$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
      {{/each}}
        `
        let html = template.render(publicTLp, {list: res});
        $('.random').html(html)
    }
});

// 获取评论数据
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(res) {
        
        let commentTpl = `
        {{each list}}
        <li>
        <a href="javascript:;">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$value.createAt.substr(0,12)}}说:
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
      </li>
      {{/each}}
        `;
        let html = template.render(commentTpl, {list: res});
        $('#newsComment').html(html);
    }
});

// 向服务器请求分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {      
        let navTpl = `
        {{each list}}
        <li>
            <a href="list.html?categoryId={{$value._id}}">
            <i class="fa {{$value.className}}"></i>
            {{$value.title}}</a>
        </li>
        {{/each}}
        `;
        let html = template.render(navTpl, {list: res});
        $('.navList').html(html);
    }
});

// 获取搜索表单,并为其添加表单提交事件
$('.search form').on('click', '.searchBtn', function() {
  //获取表单输入的关键字
  let keys = $(this).siblings('.keys').val();
  //跳转到search.html页面
  location.href = '/search.html?key=' + keys;
  return false;
})