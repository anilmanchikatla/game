<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="<?php echo $str_language; ?>" xml:lang="<?php echo $str_language; ?>">
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>Sockets test!</title>
	<link rel="stylesheet" type="text/css" media="screen" href="/site.css" />
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript" src="/desktop.js"></script>
	<script type="text/javascript" src="/game.js"></script>
</head>

<body id="desktop">


	<div id="unique-url">
		<p>Visit <span>http://<?php print $_SERVER['HTTP_HOST']; ?>/mobile.php?id=%id</span> on your mobile device for a second screen experience, or use the following QR code: <img src="https://chart.googleapis.com/chart?cht=qr&chl=http%3A%2F%2F<?php print $_SERVER['HTTP_HOST']; ?>%2Fmobile.php%3Fid%3D%id&choe=UTF-8&chs=150x150" /></p>
		<a id="close" href="#">X</a>
	</div>

	<div id="status-message">
		<p>THIS IS A STATUS MESSAGE</p>
	</div>
	<div id="game-area">
	<canvas id="myCanvas" width="500" height="500"
style="border:1px solid #c3c3c3;background:url(snakes-and-ladders.jpg);background-repeat: no-repeat;background-size: 100% 100%;">
Your browser does not support the HTML5 canvas tag.
</canvas>
<button id="start" onclick="startGame()" >Start</button>
<button id="roller" onclick="rollDice()" style="display:none">Roll</button>
<span id='ans' ></span>
<img id="scream" src="Chess.png" alt="The Scream"
width="25" height="25" style="display:none">
<img id="snake" src="Snake.jpg" alt="The Scream"
width="25" height="25" style="display:none">
</div>
	

</body>
<script>


</script>
</html>
