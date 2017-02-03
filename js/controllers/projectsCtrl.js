(function() {
    'use strict';

    cfmIssuesApp.controller('ProjectsController', ['cfaApi', ProjectsController]);

    function ProjectsController(cfaApi) {
        var model = this;

        model.currentPage = 1;
        model.pageSize = 25;

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

        cfaApi.getProjects(function(data) {
            model.projects = data;
        });

        model.issues = cfaApi.getIssues(model.pageSize).then(function(res) {
            console.log('res', res);
            model.totalCount = res.total_count;
            model.issues = res.items;
        });

        model.pageChanged = function(newPage) {
            model.issues = cfaApi.getIssues(model.pageSize, newPage).then(function(res) {
                console.log('res', res);
                model.totalCount = res.total_count;
                model.issues = res.items;
            });
        };
    }

}());
