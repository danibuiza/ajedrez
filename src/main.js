
requirejs.config({
    baseUrl : '../src',
    paths   : {
        'jquery' : 'https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
        'jquery_ui' : 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min'
    }
})
;

requirejs(["chess"]);
