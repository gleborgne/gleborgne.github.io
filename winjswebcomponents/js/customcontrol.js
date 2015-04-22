var TestApp = TestApp || {};

(function(){
	'use strict';

	class Control {
		 constructor(element, options){
			this.element = element || document.createElement('DIV');
			this.element.winControl = this;
			this.element.classList.add('a-custom-control');
			this.element.innerHTML = 'this is content from an ES6 custom control : ' + options.text;
		}
	}
	TestApp.CustomControl = Control;

	WinJSContrib.UI.WebComponents.register('my-customcontrol', Control, function (elt, options) {
		WinJSContrib.UI.WebComponents.mapAttr(elt, 'text', options);

		return options;
	});
})();