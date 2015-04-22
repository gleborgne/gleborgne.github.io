(function () {
    "use strict";

    WinJS.UI.Pages.define("/winjswebcomponents/pages/detail/detail.html?v=" + AppVersion, {
    	ready: function(element, options) {
            var page = this;                        
        },

        openHome: function(){
        	WinJS.Navigation.navigate("/winjswebcomponents/pages/home/home.html?v=" + AppVersion);
        },

        changeValue: function(){
        	var page = this;    
        	//page.mycontrol.text = page.txtValue.value;
        	page.mycontrol.setAttribute('text', page.txtValue.value);
        }
    });
})();
