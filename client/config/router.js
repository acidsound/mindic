Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    yieldTemplates: {
        'footer': { to: 'footer' },
        'menu': { to: 'menu' }
    }
});

filter={}