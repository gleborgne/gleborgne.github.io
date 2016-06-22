(function(){
    'use strict';
    importScripts('lib/sw-toolbox.js');

    //pour faire du offline il faut que la page html soit hors authent, on laisse de côté pour l'instant...

    toolbox.precache([
        '',
        'index.html',
        'trads.json',
        'dist/appstyles.css',
        'https://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic',
        'https://fonts.googleapis.com/css?family=Dosis:200,300,400,500,600,700,800', 
        'assets/logo-lg.png',       
        'assets/dripicons/webfont.css',
        'assets/dripicons/fonts/dripicons-v2.eot',
        'assets/dripicons/fonts/dripicons-v2.svg',
        'assets/dripicons/fonts/dripicons-v2.ttf',
        'assets/dripicons/fonts/dripicons-v2.woff',
        'dist/vendor.bundle.js',
        'dist/appbundle.js'
        ]);

    toolbox.router.get('https://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic', toolbox.cacheFirst);
    toolbox.router.get('https://fonts.googleapis.com/css?family=Dosis:200,300,400,500,600,700,800', toolbox.cacheFirst);
    toolbox.router.get('assets/logo-lg.png', toolbox.cacheFirst);
    toolbox.router.get('assets/dripicons/webfont.css', toolbox.cacheFirst);
    toolbox.router.get('assets/dripicons/fonts/dripicons-v2.eot', toolbox.cacheFirst);
    toolbox.router.get('assets/dripicons/fonts/dripicons-v2.svg', toolbox.cacheFirst);
    toolbox.router.get('assets/dripicons/fonts/dripicons-v2.ttf', toolbox.cacheFirst);
    toolbox.router.get('assets/dripicons/fonts/dripicons-v2.woff', toolbox.cacheFirst);
    toolbox.router.get('', toolbox.cacheFirst);
    toolbox.router.get('index.html', toolbox.cacheFirst);
    toolbox.router.get('trads.json', toolbox.networkFirst);

    toolbox.router.get('dist/appstyles.css', toolbox.cacheFirst);
    toolbox.router.get('dist/vendor.bundle.js', toolbox.cacheFirst);
    toolbox.router.get('dist/appbundle.js', toolbox.cacheFirst);
})();