var list = [];
try{
	list = JSON.parse(localStorage.engellenenler);
}catch(err){
	list = [];
}
var ayarlar = {};
try{
	ayarlar = JSON.parse(localStorage.ayarlar);
}catch(err){
	ayarlar = {};
}
if(ayarlar['gece_modu'])
{
	var head  = document.getElementsByTagName('head')[0];
	var link  = document.createElement('link');
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = 'http://youreads-34d8.kxcdn.com/css/darktheme.css';
	link.media = 'screen';
	head.appendChild(link);
}
jQuery(document).ready(function(){
	if(ayarlar['sag_kapa'])
	{
		document.getElementById("pagesag").remove();
		document.getElementById("sagscroll").style.width="calc(100% - 274px)"
	}
	document.getElementById("main").style.marginBottom = "-25px";
	if(ayarlar['facebook'])
		document.getElementsByClassName("fb-like")[0].remove();
	//google arama butonu
	var node = document.createElement("li");
	node.innerHTML='<a style="color:grey;"class="fa fa-google" target="_blank" title="başlığı google\'da ara" href="https://www.google.com.tr/search?q='+document.title.replace(' - youreads','')+'"></a>';
	try{document.getElementById("baslikbuttons").appendChild(node);}catch(err){}

	if(document.location.pathname=="/takip")
	{
		var $this = $('.SagListe .notify').parent()
		$this.insertBefore($this.siblings(':eq(0)'));
	}
	function showThem(){
		$('.SolListe .fa').each(function( index ) {$(this).parent().show()})
	}
	function removeThem(){
		for	(a = 0; a < list.length; a++) {
			$('.SolListe .'+list[a]).each(function( index ) {$(this).parent().hide()})
		}
	}
	function basa_sar(){
		if($('#showall').length==0)
		{
			$('#solframe h2').append(' <a id="showall" style="font-size: 60%;float: right;">+Tümünü Göster</a>')
			$('#showall').bind("click",function(){
				showThem();
			});
			removeThem();
			if(ayarlar['kisi'])
				yazar_kucult();
			if(ayarlar['bugun_linki'])
				bugun_linki();
		}
	}
	function yazar_kucult(){
		$('.SolListe .fa').each(function( index ) {
			if($(this).parent())
				$(this).parent().html($(this).parent().html().replace(/i>(.*) - (.*)<span/g, 'i>$1 <span style="font-size:75%;">$2</span><span'))
			}
		)
	}
	function bugun_linki(){
		$('.SolListe .fa').each(function( index ) {
			if($(this).parent())
				$(this).parent().html($(this).parent().html().replace('?go=gundem', '?go=bugun'))
				//$(this).parent().append('<span style="z-index: 999999999;background: #efefef;padding: 0 6px;font-weight: 700;color: #000;vertical-align: middle;float: right;border-radius: 5px;" onclick="document.location.href=\'/baslik/sdf--fds?go=bugun\'">&gt;</span>')
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
	/*
		$('article').each(function( index ) {
			if($(this).text().match(/spoiler/))
			{
				$(this).html($(this).html().replace(/!---- <a href=\"\/\?q=spoiler\">spoiler<\/a> ----!((.*)(\n(.*))*)!---- <a href=\"\/\?q=spoiler\">spoiler<\/a> ----!/mg, '!---- <a onclick="$(this).next().toggle()">spoilerı göster/gizle</a> ----!<span class="spoiler">$1!---- <a href="/?q=spoiler">spoiler</a> ----!<br /></span>'))
			}
		})
		$('.spoiler').hide()
	*/
	if(ayarlar['yildizli'])
		$('a:contains("*")').each(function( index ) {$( this ).text("(*"+$( this ).attr("title")+")");})
	if(ayarlar['yazi_buyut'])
		$('article').css('font-size','101%')
	try{
		var ch = $('.sagpagi').children()[1].children
		$('.sagpagi').append('<a href="'+ch[ch.length-1].value+'">'+ch.length+'</a>')
	}catch(err){}
	basa_sar();
	$('.istatistik').after('<a class="istatistik"  onclick=\'$.ajax({type: "POST",url: "/ajax_solframe.php",data: "section=istatistik|dunun-en-begenilen-yorumlari",dataType: "html",success: function(a) {$("#solframe").html(a), $("#menu a").removeClass("pointevsnone"), $("#loadingimg").hide(), $("#digermenu").hide(), $("#usermore").hide(), $("#n" + t).hide()}})\'><i class="fa fa-bar-chart pointer"></i> <span class="pointer">d.e.b.y</span></a>')
	$('#solframe').bind("DOMSubtreeModified",function(){
		setTimeout(function(){basa_sar()}, 5);
	});
})