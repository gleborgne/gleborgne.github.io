(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html?v=" + AppVersion, {
        ready: function (element, options) {
            var page = this;                        
        },

        openDetail : function(){
        	WinJS.Navigation.navigate("/pages/detail/detail.html?v=" + AppVersion);
        }
    });
})();
