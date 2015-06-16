/**
 * Created by Artem.Malieiev on 6/15/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        LibraryViewTemplate = require('text!template/library/LibraryViewTemplate.html');

    require('css!styles/library/library');

    return Backbone.View.extend({
        connectionTemplate: '<li data-name="{{- name }}">{{- name }}</li>',
        events: {
            'click li': 'onConnectionClick'
        },
        initialize: function () {
            this.collection = Tamanoir.application.collection.connections;
        },
        render: function () {
            this.$el.html(LibraryViewTemplate);
            this.collection.each(this.addConnection, this);
            return this;
        },
        addConnection: function (connectionModel) {
            this.$el.find('ul').append(_.template(this.connectionTemplate)(connectionModel.toJSON()));
        },
        onConnectionClick: function (event) {
            var connectionName = $(event.target).data('name');
            Tamanoir.application.router.navigate('library/' + connectionName, {trigger: true});
        }
    });
});