$(document).ready(function(){
	//添加待办事项
	$('#submit-btn').on('click', function(){
        var name = $('#inputName').val();
        var urgency = $('#inputUrgency').val();
        var deadline = $('#inputDeadline').val();
        var type = $('#inputType').val();
        var todo = {
        	name: name,
        	urgency: urgency,
        	deadline: deadline,
        	type: type
        };
	    $.ajax({
	        type: 'POST',
	        url: '/',
	        data: todo,
	        success: function(data){
	        	location.reload();
	        }
	    });
    	return false;
	});
	//删除待办事项
	$('input[id="delete"]').on('click', function(){
        var name = $(this).attr("title");
        var info = {name: name}
	    $.ajax({
	        type: 'DELETE',
	        url: '/',
	        data: info,
	        success: function(data){
	        	location.reload();
	        }
	    });
    	return false;
	});
	//折叠待办事项
	$('input[id="fold-button"]').on('click', function(){
		var index = $(this).attr("title");
		if ( $(this).val() === "fold") {
		$("div[title='"+index+"'] div").not(":first-child").not(":nth-last-child(1)").attr("class", "row fold");
        	$(this).val("unfold");
		}else {
			$("div[title='"+index+"'] div").attr("class", "row");
        	$(this).val("fold");
		}		        
	});
	//更新待办事项
	$('input[id="update-details"]').on('click', function(){
		var index = $(this).attr("title");
		 if($(this).prev().attr("value") === "Unfold") {
		 	$("div[title='"+index+"'] div").attr("class", "row");
        	$(this).prev().attr("value", "fold");
		 }
		if ( $(this).val() === "Update") { 
			$(this).val("Save");
			var chooseDiv = $("div[title='"+index+"']").children("div").find("input").not(':first').removeAttr('readonly').removeClass("read").addClass('modify');
		}else {
			var name = $("div[title='"+index+"'] input[title=name]").val();
	        var create_time = $("div[title='"+index+"'] input[title=create_time]").val();
	        var urgency = $("div[title='"+index+"'] input[title=urgency]").val();
	        var deadline = $("div[title='"+index+"'] input[title=deadline]").val();
	        var type = $("div[title='"+index+"'] input[title=type]").val();
	        var todo = {
	        	name: name,
	        	create_time: create_time,
	        	urgency: urgency,
	        	deadline: deadline,
	        	type: type
	        };
		    $.ajax({
		        type: 'PUT',
		        url: '/',
		        data: todo,
		        success: function(data){
		        	location.reload();
		        }
		    });
	    	return false;

		}
		
	});
	//展示添加form
	$('#add-reminder').on('click', function(){
        $(this).next().attr("class", "visible");
	});
	//取消展示
	$('#cancel-btn').on('click', function(){
        $('#add-reminder').next().attr("class", "fold");
	});
})
