(function () {
    "use strict";

    WinJS.UI.Pages.define("/winjswebcomponents/pages/detail/detail.html?v=" + AppVersion, {
    	init: function(element, options) {
            var page = this;  
            page.initText = 'Hello world !!!!';
        },

        openHome: function(){
        	WinJS.Navigation.navigate("/winjswebcomponents/pages/home/home.html?v=" + AppVersion);
        },

        changeValue: function(){
        	var page = this;    
        	//page.mycontrol.text = page.txtValue.value;
        	page.mycontrol.element.setAttribute('text', page.txtValue.value);
        }
    });
})();
