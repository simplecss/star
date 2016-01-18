(function($) {		var API = {		groupId: 32880,		folderId: 82619,		server: 'staging.x.dnevnik.ru',		cookieName: 'local_calendar_token',		scope: 'Avatar,FullName,Birthday,Age,Roles,Schools,EduGroups,Lessons,Marks,EduWorks,Relatives,Files,Contacts,Friends,Groups,Networks,Events,Wall,Messages,EmailAddress,Sex,SocialEntityMembership',			clientId: '5123975fe9eb415390fb7aa316a15e4e',		clienSecret: '367159aba7ba4a1e8b2483ebfea22435',		modalRedirectUrl: '//localhost:9001/oauth.html',		redirectUrl: '//localhost:9001',		develop: true	};	$(document).ready(function() {		dnevnik_get_token();		get_six_image_to_gallery();		auto_assign_to_group();		vote();		photo_load();		open_gallery_from_upload_photo();		file_upload();		show_procentage();		see_more();		open_photo_pop_up();		jQuery('.token').val(jQuery.cookie('dnevnik_token'));	});	// Получаем токен доступа	function dnevnik_get_token(){		// Проверяем есть ли токен и хеш		if(jQuery.cookie('dnevnik_token') && location.hash.indexOf("#access_token") > -1){			// Также заносим токен в переменную			token = location.hash;	        // Заносим токен в куку	        jQuery.cookie('dnevnik_token', token);	        // Убираем хеш из урла 	        location.hash = '';		}		// Проверяем есть ли токен		else if(jQuery.cookie('dnevnik_token') && location.hash.indexOf("#access_token") == -1){			// Заносим токен из куки			token = jQuery.cookie('dnevnik_token');		}		else {			// Проверяем есть ли токен			if(location.hash.indexOf("#access_token") > -1) {		        // Также заносим токен в переменную		        token = location.hash;		        // Убираем хеш из урла 		        location.hash = '';		        // Заносим токен в куку		        jQuery.cookie('dnevnik_token', token);		    }		    else {		    	//window.location.replace("https://login.dnevnik.ru/oauth2?response_type=token&client_id=65f0db372eb5403c88ab804e045e6c69&client_secret=558a0c63d8eb4a7c9fcd51b106d59668&scope=Avatar,FullName,Birthday,Age,Roles,Schools,EduGroups,Lessons,Marks,EduWorks,Relatives,Files,Contacts,Friends,Groups,Networks,Events,Wall,Messages,EmailAddress,Sex,SocialEntityMembership&redirect_uri=http://ad.dnevnik.ru/promo/star");		    			    	var url = 	'https://login.' + API.server + '/oauth2?response_type=token';		    		url += 	'&client_id=' + API.clientId;		    		url += 	'&client_secret=' + API.clienSecret;		    		url += 	'&scope=' + API.scope;		    		url += 	'&redirect_uri=http:' + API.redirectUrl;		    	window.location.replace(url);		    }		}		console.log(token);	}	function show_procentage(){		$('#pop-up-upload-photo #photo-upload').live('click', function(){			$('#pop-up-upload-photo form').fadeOut('slow');			$('#pop-up-upload-photo .load-photo').fadeIn('slow');		})	}	function photo_load(error){		if(error == '#wrong-format'){			$('#pop-up-upload-photo').show();			$('#pop-up-upload-photo .wrong-format').fadeIn('slow');			$('#pop-up-upload-photo form').hide();		}		if(error == '#file-size"'){			$('#pop-up-upload-photo').show();			$('#pop-up-upload-photo .file-size').fadeIn('slow');			$('#pop-up-upload-photo form').hide();		}		if(error == '#successfully'){			$('#pop-up-upload-photo').show();			$('#pop-up-upload-photo .successfully').fadeIn('slow');			$('#pop-up-upload-photo form').hide();		}		if(error == '#error-load'){			$('#pop-up-upload-photo').show();			$('#pop-up-upload-photo .error-load').fadeIn('slow');			$('#pop-up-upload-photo form').hide();		}		if(error == '#old-browser'){			$('#pop-up-upload-photo').show();			$('#pop-up-upload-photo .old-browser').fadeIn('slow');			$('#pop-up-upload-photo form').hide();		}	}	function get_six_image_to_gallery(){	    jQuery.ajax({	        url: 'https://api.' + API.server + '/v1/folder/'+ API.folderId + '/files?'+token.substr(1),	        type: "GET",	        success: function(data){	        	if(data.length){					var byVote = data.slice(0);					byVote.sort(function(a,b) {					    var x = a.vote;					    var y = b.vote;					    return x < y ? -1 : x > y ? 1 : 0;					});					data = byVote.reverse()		        	$.each( data, function( key, value ) {		        		if(key <= 5){			        		html = $('<div class="img-like"><div class="galery-image"><img id="hover-image" src="https://ad.csdnevnik.ru/special/prodaction/dnevnik_star/images/hover-image.png" alt=""><img class="main-image" src="'+value['downloadUrl']+'"></div><div vote="'+value['id']+'" class="quantity clickable">'+value['vote']+'</div></div>');			        		$('.galery .all-image').append(html);		        		}		        		number_of_the_photos = $('.galery .all-image .img-like').length;		        	});	 	        	}	        	else {	        		number_of_the_photos = 0;	        	}	        	if(number_of_the_photos <= 6 && number_of_the_photos > 0){	        		num = (6 - number_of_the_photos);		        	for (var i = 0; i < num; i++) {		        		$('.galery .all-image').append('<div class="img-like"><img src="https://ad.csdnevnik.ru/special/prodaction/dnevnik_star/images/cap.png" alt="Альтернативное изображение"><div class="quantity">0</div></div>');					}	        	}	        		        	else {	        		num = (6);		        	for (var i = 0; i < num; i++) {		        		$('.galery .all-image').append('<div class="img-like"><img src="https://ad.csdnevnik.ru/special/prodaction/dnevnik_star/images/cap.png" alt="Альтернативное изображение"><div class="quantity">0</div></div>');					}	        	}     		        }	    });	}	function auto_assign_to_group(){        jQuery.ajax({            url: 'https://api.' + API.server + '/v1/groups/'+ API.groupId + '/invite?'+token.substr(1),            type: "POST",            success: function(data){            	console.log(data)            },            error: function(err){            	console.error(err);            	if (err.status === 401){            		dnevnik_get_token();            	}            }        });	}	function vote(){		$('.quantity.clickable, .likes').live('click', function(){			var vote_id = $(this).attr('vote');			var vote = $(this);	        jQuery.ajax({	            url: 'https://api.' + API.server + '/v1/files/'+vote_id+'/like?'+token.substr(1),	            type: "POST",	            success: function(data){	            	vote.text( parseInt( $(vote).text() ) + 1 );	            },	            error: function(err){	            	//console.log(err);	            }	        });		});	}	function open_gallery_from_upload_photo(){		$('#pop-up-upload-photo .successfully .open-galery').live('click', function(){			$('#pop-up-upload-photo').hide();			$('#pop-up-images').show();			$('.image-and-like').remove();		    jQuery.ajax({		        url: 'https://api.' + API.server + '/v1/folder/' + API.folderId + '/files?'+token.substr(1),		        type: "GET",		        success: function(data){		        	$.each( data, function( key, value ) {		        		if(key == 0){first = 'first active';}		        		else {first = '';}		        		html = $('<div class="image-and-like '+first+'"><div class="name">'+value['user']['fullName']+'</div><a target="_blank" href="'+value['pageUrl']+'"><img class="photo" src="'+value['downloadUrl']+'" alt="Фото"></a> <span vote="'+value['id']+'" class="likes">'+value['vote']+'</span></div>');		        		$('#pop-up-images .content').append(html);		        		console.log(value)		        	});	   			        }		    });		});	}	function hasExtension(fileName, exts) {    	return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);	}	function file_upload(){		function upload(data){		    jQuery.ajax({		        url: 'https://api.' + API.server + '/v1/folder/' + API.folderId + '/files/upload/base64?'+token.substr(1),		        type: "POST",		    	data: data,			    //cache: false,			    //contentType: false,			    //processData: false,		        success: function(data){		        	console.log(data);		        	if (data){						$('#pop-up-upload-photo .load-photo').hide();		        		photo_load('#successfully');		        	}		        },		        error: function(err){		        	console.log(err);		        	$('#pop-up-upload-photo .load-photo').hide();		        	photo_load('#error-load');		        }		    });		}		$('#file-upload').live('change', function(){			$('.successfully, .wrong-format, .file-size, .error-load').hide();			var fileName = $(this).val();			$('#pop-up-upload-photo').fadeIn('slow');			if (! hasExtension(fileName, ['.jpg', '.jpeg', '.png']) ){				photo_load('#wrong-format');			}else{				$('#upload-form').submit();				$('#pop-up-upload-photo .load-photo').fadeIn('slow');			}		});		$('#upload-form').live('submit', function(e){			e.preventDefault();						var that = this;			var reader  = new FileReader();			var file = $('#file-upload')[0].files[0];			if (!reader){				$('#pop-up-upload-photo .load-photo').hide();		        photo_load('#old-browser');				return;			}			if (!file){				console.log('no file');				return;			}	        reader.onload = function(e) {	        	base64file = e.target.result;	        	if (base64file.indexOf('image/jpeg') > -1){	        		base64file = base64file.replace(/data:image\/jpeg;base64,/, '');	        	}else if ((base64file.indexOf('image/png') > -1)){	        		base64file = base64file.replace(/data:image\/png;base64,/, '');	        	}else{	        		$('#pop-up-upload-photo .load-photo').hide();	        		photo_load('#wrong-format');	        		return false;	        	}				var data = { 					fileName: file.name,					file: base64file				};				console.log(e.target.result);				upload(data);	        };  	        reader.readAsDataURL(file);	    });	}	function see_more(){		$('.sixth .button').live('click', function(){			$('#pop-up-images').fadeIn('slow');			$('.image-and-like').remove();		    jQuery.ajax({		        url: 'https://api.' + API.server + '/v1/folder/' + API.folderId + '/files?'+token.substr(1),		        type: "GET",		        success: function(data){		        	$.each( data, function( key, value ) {		        		if(key == 0){first = 'first active';}		        		else {first = '';}		        		html = $('<div class="image-and-like '+first+'"><div class="name">'+value['user']['fullName']+'</div><a target="_blank" href="'+value['pageUrl']+'"><img class="photo" src="'+value['downloadUrl']+'" alt="Фото"></a> <span vote="'+value['id']+'" class="likes">'+value['vote']+'</span></div>');		        		$('#pop-up-images .content').append(html);		        	});	   			        	$('.image-and-like:last').addClass('last');		        }		    });		});	}	function open_photo_pop_up(){		$('#hover-image').live('click', function(){			var id_to_active = $(this).parents('.img-like').find('.quantity').attr('vote');			$('#pop-up-images').fadeIn('slow');			$('.image-and-like').remove();		    jQuery.ajax({		        url: 'https://api.' + API.server + '/v1/folder/' + API.folderId + '/files?'+token.substr(1),		        type: "GET",		        success: function(data){		        	$.each( data, function( key, value ) {		        		html = $('<div id="active-'+value['id']+'" class="image-and-like"><div class="name">'+value['user']['fullName']+'</div><a target="_blank" href="'+value['pageUrl']+'"><img class="photo" src="'+value['downloadUrl']+'" alt="Фото"></a> <span vote="'+value['id']+'" class="likes">'+value['vote']+'</span></div>');		        		$('#pop-up-images .content').append(html);		        	});		        	$('#active-'+id_to_active).addClass('first active').insertAfter('#pop-up-images .content .next')		        	$('.image-and-like:last').addClass('last');		        }		    });		})	}  })(jQuery);