var css = document.createElement("style");
css.innerHTML="#main{margin-bottom:-25px!important}";
css.id="pl";
(document.head||document.documentElement).appendChild(css);
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
var engelli_basliklar = {};
try{
	engelli_basliklar = JSON.parse(localStorage.engelli_basliklar);
}catch(err){
	engelli_basliklar = {};
}
function checkPosition()
{
	if($(window).width() < 833)
	{
		document.getElementById("sagscroll").style.width="100%"
	} else {
		document.getElementById("sagscroll").style.width="calc(100% - 274px)"
	}
}
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}
function arama(e)
{
	var t = 'title-search';
	if (e.length < 3) return alert("Detaylı arama için en az 3 karakter girin"), !1;
	var i = "section=" + t + "&q=" + e;
	$("#loadingimg").show(), $("#solscroll").show(), $("#menu a").removeClass("current"), $(this).addClass("current"), $("#menu a").addClass("pointevsnone"), $.ajax({
		type: "POST",
		url: "/ajax_solframe.php",
		data: i,
		dataType: "html",
		success: function(a) {
			$("#solframe").html(a), $("#menu a").removeClass("pointevsnone"), $("#loadingimg").hide(), $("#digermenu").hide(), $("#usermore").hide(), $("#n" + t).hide()
		}
	})
}
if(ayarlar['sag_kapa'])
	css.innerHTML+="#pagesag{display:none}@media handheld,only screen and (min-width:850px) {#sagscroll {width: calc(100% - 274px)!important;}}";
if(ayarlar['facebook'])	css.innerHTML+=".fb-like{display:none!important}";
if(ayarlar['newnumber']) css.innerHTML+=".newnumber{display:none!important}";
if(ayarlar['carpi']) css.innerHTML+="ul.SolListe li{margin-right:25px;}";
if(ayarlar['yuvarlak_hatlar']) css.innerHTML+=".boxcontainer{border-radius: 1em;}";
if(ayarlar['gece_modu'])
	css.innerHTML+="body {background: #3D3D3D!important;  color: #C8C8C8!important;}nav{background: rgb(45, 45, 45)!important;}.boxcontainer{background: #2D2D2D!important;  border: 1px solid #222222!important; box-shadow: 0 3px 3px 1px #222222!important;}";
if(ayarlar['gece_modu'])
{
	var link  = document.createElement('link');
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = 'http://youreads-34d8.kxcdn.com/css/darktheme.css';
	link.media = 'screen';
	(document.head||document.documentElement).appendChild(link);
}