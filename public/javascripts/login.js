var $btn = $("#fbLogin");

$btn.click(function(event){
	$.get('/auth/facebook').done(onSuccess).error(onError);
});

var onSuccess = function(data, status){
	console.log(data);
	console.log(status);
};

var onError = function(data, status){
	console.log(data);
	console.log(status);
};