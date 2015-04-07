AppVersion = '1.1';
WinJS.Utilities.ready(function(){
	WinJS.UI.processAll(document.body).then(function(){
		console.log('DONE !!!');
		WinJS.Navigation.navigate('/winjswebcomponents/pages/home/home.html?v=' + AppVersion, { version: '1' });
	});
});