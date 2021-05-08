const workboxBuild = require('workbox-build');

const buildSw = () => {
    return workboxBuild.injectManifest({
        swSrc: 'src/service-worker.js',
        swDest: 'build/sw.js',
        globDirectory: 'build',
        globPatterns: [
            '**\/*.css',
            'index.html',
            'js\/animation.js',
            'images\/home\/*.jpg',
            'images\/icon\/*.svg',
        ]
    }).then(resources => {
        console.log(`Injected ${resources.count} resources for precaching, ` +
            `totaling ${resources.size} bytes.`);
    }).catch(err => {
        console.log('Uh oh 😬', err);
    });
}
buildSw();