AppVersion = '1.0';
WinJS.Utilities.ready(function(){
	WinJS.UI.processAll(document.body).then(function(){
		console.log('DONE !!!');
		WinJS.Navigation.navigate('/pages/home/home.html?v=' + AppVersion, { version: '1' });
	});
});