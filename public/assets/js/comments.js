
let cArr= [];
//获取评论列表
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(res) {
        cArr = res;
        let html = template('commentsTep', res);
        $('tbody').html(html);  
    }
});

//实现分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(res) {
             cArr = res;

            let html = template('commentsTep', res);
            $('tbody').html(html);  
            let pageHtml = template('pageTep', res);
            $('#pageBox').html(pageHtml);   
        }
    })
}
changePage();

//当审核被点击的时候
$('tbody').on('click', '.status', function() {
    //获取id
    let id = $(this).parent().attr('data-id');
    //获取state的属性
    let status = $(this).attr('#data-status');
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function (res) {
            changePage();
        }
    })
});

//用户点击删除
$('tbody').on('click', '.delete', function() {
    //获取id
    let id = $(this).parent().attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/comments/' + id,
        success: function() {
            changePage();
        }
    })
});