App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return phrases;
  }
});

var keys = "q w e r t y u i o p".w().reverse(), keyMap = {};

App.AudioView = Ember.View.extend({
    template: Em.Handlebars.compile('<a class="btn span2" href="#">{{view.name}}</a>{{view App.AudioPlaybackView srcBinding="view.src"}}'),
    src: null,
    name: null,
    classNames: ['btn-audio'],
    init: function () {
        this._super();
        var that = this;

        var currentKey = keys.pop();
        keyMap[currentKey] = function () {
            that.play();
        };
    },
    click: function () {
        return this.play();
    },
    play: function () {
        $('audio').each(function (i, e) {
            e.pause();
            e.currentTime = 0;
        });
        this.get('childViews')[0].$()[0].play();
        return false;
    }
});


$('body').keydown(function (event) {
    var pressedKey = String.fromCharCode(event.keyCode).toLowerCase();
    if (keyMap[pressedKey]) {
        keyMap[pressedKey]();
    }
});

App.AudioPlaybackView = Ember.View.extend({
    tagName: 'audio',
    attributeBindings: 'src'.w(),
    src: null
});

