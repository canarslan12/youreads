jQuery(document).ready(function(){
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
	var hepsi = ["fa-area-chart", "fa-space-shuttle", "fa-bars", "fa-graduation-cap","fa-try", "fa-beer", "fa-comments","fa-newspaper-o","fa-heart","fa-male", "fa-book", "fa-building", "fa-headphones", "fa-gamepad", "fa-medkit", "fa-paint-brush", "fa-plane", "fa-film", "fa-gavel", "fa-question-circle", "fa-futbol-o", "fa-history", "fa-apple", "fa-eye", "fa-desktop", "fa-youtube-play", "fa-pencil-square-o", "fa-code", "fa-cutlery", "fa-copyright"];
	var isimler = ["Anket","Bilim", "Çeşitli", "Eğitim", "Ekonomi", "Etkinlik", "Felsefe", "Haber","İlişkiler", "Kişi-Topluluk", "Kitap", "Mekan", "Müzik", "Oyun", "Sağlık", "Sanat", "Seyahat", "Sinema", "Siyaset", "Soru-Cevap", "Spor", "Tarih", "Teknoloji-Web", "Tiyatro", "Tv-Serisi", "Video", "Yazar", "Yazılım", "Yeme-İçme", "Youreads"];
	var ad="<hr><div><label for=kanal>engellenecek kanallar</label><form>";
	for	(a = 0; a < hepsi.length; a++) {
		ad+='<div class="col3"><input type="checkbox" id=canarslan12 name="'+hepsi[a]+'"';
		if(jQuery.inArray(hepsi[a], list)!=-1)
			ad+=" checked";
		ad+='>'+isimler[a]+'</div>';
	}
	ad+='<div class="spacer"></div><input type="button" id="ayarla" value="Ayarla" class="butonB"></form></div>';
	$('#a5').append(ad);
	
	hepsi = ["spoiler", "yildizli","kisi","sag_kapa","yazi_buyut","facebook","gece_modu","bugun_linki","ctrl","edit_tarih","newnumber"];
	isimler = ["spoiler gözükmesin", "yıldızlı bkz.lar otomatik açılsın","sol frame'de yazar/yönetmen/şarkıcı daha küçük olsun","sağ taraftaki öneri panelini kapansın","yazılar biraz büyüsün","alttaki facebook şeyi yok olsun","gece modu hep açık kalsın","sol frame'deki linkler bugün girilen yorumları açsın","ctrl+enter ile yorum gönderme","düzenlenen yorumlarda düzenleme tarihinin gözükmesi","kategorilerin üstündeki kırmızı balonlar yok olsun"];
	var ekle="<hr><div><label for=eklenti>eklenti ayarları</label><a onclick='$(this).next().children().children().click()'>Tümüne tıkla</a><form>";
	for	(a = 0; a < hepsi.length; a++) {
		ekle+='<p><input type="checkbox" id="ayarlar" name="'+hepsi[a]+'"';
		if(ayarlar[hepsi[a]])
			ekle+=" checked";
		ekle+='>'+isimler[a]+'</p>';
	}
	ekle+='<div class="spacer"></div><input type="button" id="ayarla1" value="Ayarla" class="butonB"></form><input type="button" id="engel_temizle" value="Engellileri temizle" class="butonB"></div>';
	$('#a1').append(ekle);
	
	document.getElementById("ayarla1").addEventListener("click", function(){
		 var secilenler= {};
		 $("#ayarlar:checked").each(function( index ) {secilenler[$(this)[0].name]=1})
		 localStorage["ayarlar"]=JSON.stringify(secilenler);
	},true);
	document.getElementById("ayarla").addEventListener("click", function(){
		 var secilenler=[];
		 $("#canarslan12:checked").each(function( index ) {secilenler.push($(this)[0].name)})
		 localStorage["engellenenler"]=JSON.stringify(secilenler);
	},true);
	document.getElementById("engel_temizle").addEventListener("click", function(){
		 var engelli_basliklar={};
		 localStorage["engelli_basliklar"]=JSON.stringify(engelli_basliklar);
	},true);
})