(function () {
    "use strict";

    WinJS.UI.Pages.define("/winjswebcomponents/pages/home/home.html?v=" + AppVersion, {
        ready: function (element, options) {
            var page = this;                        
        },

        openDetail : function(){
        	WinJS.Navigation.navigate("/winjswebcomponents/pages/detail/detail.html?v=" + AppVersion);
        }
    });
})();
