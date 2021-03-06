var codeView = document.getElementById('code-view');
var consoleView = document.getElementById('console-view');
var playgroundVersion = "1.1.1";

var editor = ace.edit("code-view");
editor.session.setMode("ace/mode/javascript");
editor.renderer.setShowGutter(false); 

function playground(callback){
	var log = function(kind, data){
		var m = document.createElement('div');
		for (var k=0 ; k<data.length; k++){
			var item = data[k];
			var i = document.createElement('div');
			if (typeof item == 'string'){
				i.innerText = item;
			}	
			else {	
				if (item.description){
					i.innerText = item.description;
				} else if (item.message){
					i.innerText = item.message;
				} else{	
					i.innerText = JSON.stringify(item);
				}
			}
			m.appendChild(i);
		}
		
		m.className = 'message ' + kind;
		//consoleView.insertBefore(m, consoleView.firstChild);
		consoleView.appendChild(m);
	}

	var console = {
		log : function(msg){
			log('info', arguments);			
		},
		error : function(msg){
			log('error', arguments);			
		}
	};

	//window.console = console;

	try{
		var txt = callback + '';
		txt = txt.substr(txt.indexOf('{')+1, txt.length).trim();
		txt = txt.substr(0, txt.lastIndexOf('}')).trim();
		editor.setValue(txt, 0);
		editor.clearSelection();
		eval('(' + callback + ')();');
	}catch(exception){
		log('error', [exception]);	
	}
	//editor = ace.edit("code-view");
    //editor.session.setMode("ace/mode/javascript");
}

function fetch(lesson){
	consoleView.innerHTML = '';
	$.ajax({ url: 'lessons/' + lesson + '.txt?v=' + playgroundVersion }).then(function(r){
		console.log(JSON.stringify(r))
		playground('function(){' + r + '}')
	});
}

document.querySelector('#btnRunCode').onclick = function(){
	var text = editor.getValue();
	$('.message').fadeOut('fast').promise().then(function(){
		consoleView.innerHTML = '';
		playground('function(){' + text + '}');
	});
}

document.querySelector('#lessons').onchange = function setLesson(){
	fetch(document.querySelector('#lessons').value);
}

document.querySelector('#fontSize').onchange = function setFontSize(){
	codeView.style.fontSize = document.querySelector('#fontSize').value + "pt";
	consoleView.style.fontSize = document.querySelector('#fontSize').value + "pt";
}

codeView.style.fontSize = document.querySelector('#fontSize').value + "pt";
consoleView.style.fontSize = document.querySelector('#fontSize').value + "pt";
fetch(document.querySelector('#lessons').value);