var TestApp = TestApp || {};

(function(){
	'use strict';

	var Control = function(element, options){
		this.element = element || document.createElement('DIV');
		this.element.winControl = this;
		this.element.classList.add('a-custom-control');
		this.element.innerHTML = 'this is content from a custom control : ' + options.text;
	}

	TestApp.CustomControl = Control;

	WinJSContrib.UI.WebComponents.register('my-customcontrol', Control, function (elt) {
		var options = {};
		WinJSContrib.UI.WebComponents.mapAttr(elt, 'text', 'text', options);

		return options;
	});
})();