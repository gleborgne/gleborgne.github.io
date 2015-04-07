(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/detail/detail.html?v=" + AppVersion, {
        ready: function (element, options) {
            var page = this;                        
        },

        openHome : function(){
        	WinJS.Navigation.navigate("/pages/home/home.html?v=" + AppVersion);
        }
    });
})();
