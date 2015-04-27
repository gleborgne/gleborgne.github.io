var TestApp = TestApp || {};

(function(){
	'use strict';

	var Control = WinJS.Class.define(function(element, options) {		 
			this.element = element || document.createElement('DIV');
			this.element.winControl = this;
			this.element.classList.add('a-custom-control');
			this.text = options.text;		
	}, {
		text:{
			get: function(){
				return this._text;
			},
			set: function(val){
				this._text = val;
				this.element.innerHTML = 'this is content from an ES6 custom control : ' + this._text;
			}
		}
	});
	TestApp.CustomControl = Control;

	WinJSContrib.UI.WebComponents.register('my-customcontrol', Control, {
		properties: ['text']
	});
})();