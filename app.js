requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        jquery: 'jquery-2.2.3'
    }
});

requirejs(['app/main']);
