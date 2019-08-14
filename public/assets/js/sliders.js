//创建空的数组
let newArr = [];

// 图片上传
$('#file').on('change', function() {
	//创建二进制文件对象
	var formData = new FormData();
	//添加文本信息到对象
	formData.append('image', this.files[0]);
	//向服务器发送请求
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function(res) {
			// console.log(res);
			//将图片地址添加到隐藏域中
			$('#image').val(res[0].image);
			$('.thumbnail').attr('src', res[0].image).show();	
		}
		
	})
});

// 获取轮播图列表
$.ajax({
	type: 'get',
	url: '/slides',
	success: function(res) {
		// console.log(res);
		newArr = res
		render(newArr);
	}
});

//添加轮播图图片
$('#aBtn').on('click', function() {
	$.ajax({
		type: 'post',
		url: '/slides',
		data: $('#imageForm').serialize(),
		success: function(res) {
			newArr.push(res);
			render(newArr);
		}
	})
});

//删除轮播图
$('tbody').on('click', '.delete', function() {
	if (confirm('您真的要删除吗?')) {
		let id = $(this).attr('data-id');
	$.ajax({
		type: 'delete',
		url: '/slides/' + id,
		success: function(res) {
			let index = newArr.findIndex(item => item._id == id);
			newArr.splice(index, 1);
			render(newArr);
		}
	})
	}
})
	
function render(name) {

	let html = template('imageTpl', {list: name})
	$('tbody').html(html);
}