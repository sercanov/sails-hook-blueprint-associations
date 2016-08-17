var _ = require('lodash');
var pluralize = require('pluralize');

const blueprintAssociations = function(request, response) {
	var model = request.options.model || request.options.controller;
	if (!model) throw new Error(util.format('No "model" specified in route options.'));

	var Model = request._sails.models[model];
	if ( !Model ) throw new Error(util.format('Invalid route option, "model".\nI don\'t know about any models named: `%s`',model));

	if(Model.associations){
		return response.ok({associations: Model.associations})
	}

};

module.exports = function (sails) {
  return {
      initialize: function(callback) {

        var config = sails.config.blueprints;
        var blueprintAssociationsFunction = _.get(sails.middleware, 'blueprints.associations') || blueprintAssociations;

        sails.on('router:before', function() {
			_.forEach(sails.models, function(model) {
				var controller = sails.middleware.controllers[model.identity];

				if (!controller) return;

				var baseRoute = [config.prefix, model.identity].join('/');

				if (config.pluralize && _.get(controller, '_config.pluralize', true)) {
				 	baseRoute = pluralize(baseRoute);
				}

				var route = baseRoute + '/associations';

				sails.router.bind(route, blueprintAssociationsFunction, null, {controller: model.identity});

			});
        });

        callback();
      }
  }
};