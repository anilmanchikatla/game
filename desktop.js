/**
 * @file
 * JS for desktop devices.
 *
 */

/*global jQuery, window, WebSocket */

/**
 * On document ready.
 */
 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
jQuery(document).ready(function ($) {

  
window.x=5;
window.y=470;
var Map={};
Map[155*500+470]=305*500+420;
Map[405*500+470]=455*500+320;
Map[155*500+420]=305*500+470;
Map[5*500+420]=105*500+320;
Map[355*500+370]=155*500+70;
Map[5*500+320]=55*500+220;
Map[305*500+220]=305*500+320;
Map[455*500+220]=305*500+170;
Map[155*500+170]=5*500+220;
Map[105*500+170]=5*500+70;
Map[455*500+120]=455*500+20;
Map[355*500+20]=355*500+120;
Map[255*500+20]=255*500+120;
Map[55*500+20]=105*500+120;
Map[55*500+170]=55*500+420;
Map[305*500+70]=155*500+370;
window.right=true;
window.Map=Map;
window.startX=0;
window.startY=0;
window.endX=0;
window.endY=0;
  
  
		
  // Get the domain.
  var host = window.location.hostname;

  // Create a websocket object. TODO: Make it work in IE.
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  // Create a connection to the server.
  var connection = new WebSocket('ws://' + host + ':1337');

  // When a connection is opened for the first time.
  connection.onopen = function () {

    // Send a message to the server telling it the desktop is connecting.
    var msg = JSON.stringify({ type: 'connect', data: 'desktop' });
    connection.send(msg);
  };

  // When the connection errors.
  connection.onerror = function (error) {
    // TODO: Implement error notifications when sending/receiving data.
  };

  // When a message is received from the server.
  connection.onmessage = function (message) {

    // Decode the message from the server.
    try {
      var received = JSON.parse(message.data);

      // After the desktop has connected to the server it sends back a unique ID.
      if (received.type === 'uniqueID') {

        // Update the mobile connection message and show it to the user.
        var uniqueID = received.data;
        $('#unique-url p').html($('#unique-url p').html().replace(/%id/g, uniqueID));
        $('#unique-url').fadeIn(100);
        return;
      }

      // When a module device connects with the same unique URL, the
      // server sends a notification to the desktop.
      if (received.type === 'mobile_device_connected') {

        // Remove the mobile connection message, and tell the user
        // that the mobile device has connected successfully.
        $('#unique-url').fadeOut(100);
        $('#status-message')
          .html('<p>Mobile device connected!</p>')
          .fadeIn(100, function () {
            setTimeout(function () {
              $('#status-message').fadeOut(100);
            }, 3000);
          });

        return;
      }

      // A scroll request has been received.
      if (received.type === 'scroll_request') {
//	alert(received.data);
	rollDice(parseInt(received.data));
	
	
	
	
        // First work out the previous and next elements to scroll to.
        var prev = null;
        var next = null;

        // For each page.
        $('.page').each(function () {

          // If the browser aligns exactly to a page, previous and
          // next are obvious.
          if ($(this).position().top === $(window).scrollTop()) {
            prev = $(this).prev();
            next = $(this).next();

            return false;
          }

          // If we have scrolled half way through a page, previous
          // should be the current page.
          if ($(this).position().top < $(window).scrollTop()) {
            prev = $(this);
            next = $(this).next();
          }
        });

        // If previous and next have not been found.
        if (prev.length) {
          prev = prev.position().top;
        } else {
          prev = 0;
        }

        if (next.length) {
          next = next.position().top;
        } else {
          next = $(document).height();
        }

        // Scroll the page to the correct place.
        switch (received.data) {
        case 'scroll-down':
          $('body,html').animate({ scrollTop: next });
          break;
        case 'scroll-up':
          $('body,html').animate({ scrollTop: prev });
          break;
        }
      }


    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ', message.data);
      return;
    }
  };


  // Close button for Unique URL popup
  $('#unique-url #close').bind('click', function (e) {
    e.preventDefault();
    $(this).closest('#unique-url').fadeOut(100);
  });

});

function drawChar(a,b) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");    
    var img = document.getElementById("scream");
    ctx.drawImage(img,a,b,25,25);
}

function removeChar(a,b)
{
	var c = document.getElementById("myCanvas");
    	var ctx = c.getContext("2d");
	var img = ctx.createImageData(25, 25);
	for (var i = img.data.length; --i >= 0; )
  	img.data[i] = 0;
  	ctx.putImageData(img, a, b);
}
function startGame()
{
 document.getElementById('roller').style.display='block';
 document.getElementById('start').style.display='none';
drawChar(window.x,window.y);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice(dieval)
{
	
//	alert("i am coming");
	removeChar(window.x,window.y);
	var prevx=window.x;
	var prevy=window.y;
	if(right)
	window.x+=50*dieval;
	else
	window.x-=50*dieval;
	if(window.x>500)
	{
		window.x=455;
		window.y-=50;
		right=false;
	}
	if(window.x<0&&window.y!=20)
	{
		window.x=5;
		window.y-=50;
		window.right=true;
	}
	if(window.x==5&&window.y==20)
	{
		drawChar(window.x,window.y);
		alert("You won");
		document.getElementById('roller').style.display='none';
		return;
	}
	if(window.x<0&&window.y==20)
	{
	
		window.x=prevx;
		window.y=prevy;
	}
	//document.getElementById("ans").innerHTML=x+" "+y+" "+dieval;	
	drawChar(window.x,window.y);
	
	if(500*window.x+window.y in window.Map)
	{
		 document.getElementById('roller').style.display='none';
		 window.startX=window.x;
		 window.startY=window.y;
		 var newint=parseInt(window.Map[500*window.x+window.y]);
		 window.endX=Math.floor(newint/500);
		 window.endY=newint%500;
		 var diffX,deffY;
		 diffX=diff(window.startX,window.endX);
		 diffY=diff(window.startY,window.endY);
		if(diffX==0)
		 {
		 	window.addX=0;
		 	window.addY=5;
		 }else if(diffY==0)
		 {
		 	window.addY=0;
		 	window.addX=5;
		 }else{
		 	var factor=gcd(diffX,diffY);
		 	window.addX=5*(diffX/factor);
		 	window.addY=5*(diffY/factor);
		 	
		 }
		 if(window.endX<window.startX)
		 window.addX*=-1;
		 if(window.endY<window.startY)
		 window.addY*=-1;
	//	 alert(startX+" "+startY+" "+endX+" "+endY+" "+addX+" "+addY);
		 window.gameLoop=setInterval(drawSlow,100);
		//setTimeout(doSomething, 1000);
	}
}
function drawSlow()
{
	removeChar(window.startX,window.startY);
	window.startX+=window.addX;
	window.startY+=window.addY;
	drawChar(window.startX,window.startY);
	if(window.startX==window.endX&&window.startY==window.endY)
	{
		clearInterval(window.gameLoop);
		window.x=window.endX;
		window.y=window.endY;
		if((Math.floor(window.y/50))%2==1)
		window.right=true;
		else
		window.right=false;
		document.getElementById('roller').style.display='block';
	}
}
	
function doSomething()
{
	removeChar(window.x,window.y);
	var newint=parseInt(window.Map[500*window.x+window.y]);
	drawChar(Math.floor(newint/500),newint%500);
	window.x=Math.floor(newint/500);
	window.y=newint%500;
	var fin=Math.floor(window.y/50);
	if((Math.floor(window.y/50))%2==1)
	window.right=true;
	else
	window.right=false;
	document.getElementById('roller').style.display='block';
}
var gcd = function(a, b) {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
};
var diff = function(a, b) {
	if(a>b)
	return a-b;
	return b-a;
}
