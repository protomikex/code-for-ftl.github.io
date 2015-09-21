(function() {
    'use strict';

    cfmIssuesApp.controller('ProjectsController', ['cfaApi', ProjectsController]);

    function ProjectsController(cfaApi) {
        var model = this;

        cfaApi.getProjects(function(data) {
            model.languageOptions = [
                {'key': 'css', 'value': 'CSS'},
                {'key': 'groovy', 'value': 'Groovy'},
                {'key': 'html', 'value': 'HTML'},
                {'key': 'java', 'value': 'Java'},
                {'key': 'javascript', 'value': 'JavaScript'},
                {'key': 'php', 'value': 'PHP'},
                {'key': 'python', 'value': 'Python'},
                {'key': 'ruby', 'value': 'Ruby'}
            ];
            model.projects = data;
        });
    }

}());
