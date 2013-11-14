WordController = RouteController.extend({
    template: 'word'
});

Router.map(function () {
    this.route('word', {
        path :  '/words/:word/:seq',
        controller :  WordController
    });
});

