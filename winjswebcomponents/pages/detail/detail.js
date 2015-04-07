(function () {
    "use strict";

    class DetailPage {
    	ready(element, options) {
            var page = this;                        
        },

        openHome(){
        	WinJS.Navigation.navigate("/winjswebcomponents/pages/home/home.html?v=" + AppVersion);
        }
    }

    WinJS.UI.Pages.define("/winjswebcomponents/pages/detail/detail.html?v=" + AppVersion, DetailPage);
})();
