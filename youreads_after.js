if(document.getElementsByTagName('link')[6].href=="http://youreads-34d8.kxcdn.com/css/darktheme.css")
	ayarlar["gece_modu"]=1;
if(ayarlar['gece_modu'])
	css.innerHTML+=".logo_1{color:#E2CB7A!important;}.logo_2{color:#E2CB7A!important;}.block{border-bottom: 1px solid #000000!important;} .block:hover {background: rgba(23, 23, 23, 1)!important; color: inherit!important;}";
if(ayarlar['gece_modu'])
{
	var link  = document.createElement('link');
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = 'http://youreads-34d8.kxcdn.com/css/darktheme.css';
	link.media = 'screen';
	(document.head||document.documentElement).appendChild(link);
}
jQuery(document).ready(function(){
	if(ayarlar['gece_modu'])
	{
		var link  = document.createElement('link');
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = 'http://youreads-34d8.kxcdn.com/css/darktheme.css';
		link.media = 'screen';
		(document.head||document.documentElement).appendChild(link);
	}
	//google arama butonu
	var node = document.createElement("li");
	node.innerHTML='<a style="color:grey;" class="fa fa-google" target="_blank" title="başlığı google\'da ara" href="https://www.google.com.tr/search?q='+document.title.replace(' - youreads','')+'"></a>';
	try{document.getElementById("baslikbuttons").appendChild(node);}catch(err){}
	//uye sayfası butonu
	if($('.konuBaslik .kanal .fa-copyright').length)
	{
		var node = document.createElement("li");
		node.innerHTML='<a style="color:grey;" class="fa fa-info" title="kullanıcı sayfasına git" href="/profil/'+document.title.replace(' - youreads','').replace(/\s/g,'-')+'"></a>';
		try{document.getElementById("baslikbuttons").appendChild(node);}catch(err){}
	}
	if($('.konuBaslik.konuBaslik a:contains(" - ")').length)
	{
		$this=$('.konuBaslik.konuBaslik a:contains(" - ")');
		$this.parent().html($this.parent().html().replace(/">(.*) - (.*)<\/a>/g, '">$1</a> <a data-arama="$2" href="#" id="yazar" style="font-size:75%;">$2</span><span'))
		$('#yazar')[0].href=$('#yazar')[0].href.replace(/%20/g,'-')
		$('#yazar').bind("click",function(){
			arama($(this).attr('data-arama'));
		});
	}
	if(document.location.pathname=="/takip")
	{
		var $this = $('.SagListe .notify').parent()
		$this.insertBefore($this.siblings(':eq(0)'));
	}
	function showThem(){
		$('.SolListe li:hidden').each(function( index ) {$(this).show()})
	}
	function removeThem(){
		for	(a = 0; a < list.length; a++) {
			$('.SolListe .'+list[a]).each(function( index ) {$(this).parent().parent().hide()})
		}
		//engellenenleri gizle
		$('.SolListe  li:visible').each(function( index ) {
			var re = /--(\d+)\?/; 
			var m;
			if ((m = re.exec($(this).children().attr('href'))) !== null) {
				if (m.index === re.lastIndex) {
					re.lastIndex++;
				}
				if(( engelli_basliklar[m[1]]==1))
					$(this).hide();
			}
			/*
			this.addEventListener('dragstart', function(evt){
			  tasinan=this;
			}, false);*/
		})
	}
	function basa_sar(){
		if($('#showall').length==0)
		{
			$('#solframe h2').append(' <a id="showall" class=pointer style="font-size: 60%;float: right;">+Tümünü Göster</a>')
			$('#showall').bind("click",function(){
				showThem();
			});
			removeThem();
			if(ayarlar['kisi'])	yazar_kucult();
			if(ayarlar['bugun_linki']) bugun_linki();
			if(ayarlar['carpi']) baslik_engelleme();
		}
	}
	function yazar_kucult(){
		$('.SolListe .fa').each(function( index ) {
			$(this).parent().html($(this).parent().html().replace(/i>(.*) - (.*)<span/g, 'i>$1 <span style="font-size:75%;">$2</span><span'))
		})
	}
	function baslik_engelleme(){
		$('.SolListe li').prepend('<p class="block"><i class="fa fa-times"></i></p>');
		$('.block').bind("click",function(){
			var re = /--(\d+)\?/;
			var m;
			if ((m = re.exec($(this).prev().attr('href'))) !== null)
			{
				if (m.index === re.lastIndex) {
					re.lastIndex++;
				}
				engelli_basliklar[m[1]]=1;
				localStorage["engelli_basliklar"]=JSON.stringify(engelli_basliklar);
			}
			$(this).parent().hide();
		});
	}
	function bugun_linki(){
		$('.SolListe .fa').each(function( index ) {
			$(this).parent()[0].href+='&go=bugun';
		})
	}
	if(ayarlar['spoiler'])
	{
		$('article').each(function( index ) {
			if($(this).text().match(/spoiler/))
			{
				$(this).html($(this).html().replace(/!---- <a href=\"\/\?q=spoiler\">spoiler<\/a> ----!((.*)(\n(.*))*)!---- <a href=\"\/\?q=spoiler\">spoiler<\/a> ----!/mg, '!---- <a onclick="$(this).next().toggle()">spoilerı göster/gizle</a> ----!<span class="spoiler">$1!---- <a href="/?q=spoiler">spoiler</a> ----!<br /></span>'))
			}
		})
		$('.spoiler').hide()
	}
	//baslik_engelleme
/*	$('#menu').append('<li><a id="trash" ondragover="event.preventDefault();this.children[0].setAttribute(\'class\', \'fa fa-trash-o\');" ondragleave="event.preventDefault();this.children[0].setAttribute(\'class\', \'fa fa-trash\');" class="triggerleft" title="Engellemek istediğiniz başlığı sürükleyip bırakın"><i class="fa fa-trash"></i></a></li>')
	$("#trash").on("drop", function(event) {
		event.preventDefault();  
		event.stopPropagation();
		tasinan.hidden=true;
		var re = /--(\d+)\?/;
		var m;
		if ((m = re.exec($(tasinan).children()[0].href)) !== null)
		{
			if (m.index === re.lastIndex) {
				re.lastIndex++;
			}
			engelli_basliklar[m[1]]=1;
			localStorage["engelli_basliklar"]=JSON.stringify(engelli_basliklar);
		}
	});*/
	if(ayarlar['yildizli'])
		$('a:contains("*")').each(function( index ) {$( this ).text("(*"+$( this ).attr("title")+")");})
	if(ayarlar['ctrl']) $('#entrytxt').keydown(function(e) {if( e.which==13 && e.ctrlKey) $('#bpost').click();});
	if(ayarlar['yazi_buyut']){
		$('ul.SolListe li a').css('font-size','101%')
		$('article').css('font-size','101%')
	}
	if(ayarlar['edit_tarih'])
	{
		$('.edittime').each(function( index ) {
			$(this).css('color','#747474').text(' - '+$(this).attr('title').replace(' tarihinde düzenlendi',''))
		})
	}
	try{
		var ch = $('.sagpagi').children()[1].children
		$('.sagpagi').append('<a href="'+ch[ch.length-1].value+'">'+ch.length+'</a>')
	}catch(err){}
	basa_sar();
	$('.istatistik').after('<a class="istatistik pointer"  onclick=\'$("#loadingimg").show(), $("#solscroll").show(), $("#menu a").removeClass("current"), $(this).css("color","#C41F2C"), $("#menu a").addClass("pointevsnone"),$.ajax({type: "POST",url: "/ajax_solframe.php",data: "section=istatistik|dunun-en-begenilen-yorumlari",dataType: "html",success: function(a) {$("#solframe").html(a), $("#menu a").removeClass("pointevsnone"), $("#loadingimg").hide(), $("#digermenu").hide(), $("#usermore").hide(), $("#n" + t).hide()}})\'><i class="fa fa-level-up"></i> <span>d.e.b.y</span></a>')
	$('#solframe').bind("DOMSubtreeModified",function(){
		setTimeout(function(){basa_sar()}, 5);
	});
	
	$('#title-search').remove()
	$('#searchbutton').after('<a id="title-search"><i class="fa fa-search"></i></a>');
	$('#title-search').bind("click",function(){arama($("input#searchinput").val());});
	$('#logodiv').prepend('<div class=logo_1 onclick="document.location.href=\'/baslik/youreads---27921\'" alt="youreads++" title="youreads++">+<div onclick="/baslik/youreads---27921" alt="youreads++" title="youreads++" class=logo_2>+</div></div>')
	if($('.top10').text()=="Bu başlığa bugün yorum yapılmamış.")
		document.location.href=document.location.pathname.split('?')[0]+"?alert=bugün bisey yoktu, ben de hepsini açtım";
	if(getQueryParams(document.location.search).alert)
		$('.kanal').append("<p style='float: right;'>"+getQueryParams(document.location.search).alert+"</p>")
})