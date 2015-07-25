(function() {
    'use strict';

    cfmIssuesApp.controller('ProjectsController', ['cfaApi', ProjectsController]);

    function ProjectsController(cfaApi) {
        var model = this;

        cfaApi.getProjects(function(data) {
            model.projects = data;
        });
    }

}());
