(function() {

    var cfmIssuesApp = angular.module('cfmIssuesApp', ['angular-loading-bar', 'ngAnimate']);

    // TODO: Make factory
    var ProjectsController = function($scope, $http) {
        var brigadeName = 'Code-for-Miami';
        var cfaApiUrl = 'http://codeforamerica.org/api';
        var cfaOrgSlug = '/organizations/' + brigadeName;
        var cfaProjectsSlug = '/projects';
        var apiProjectsUrl = cfaApiUrl + cfaOrgSlug + cfaProjectsSlug;
        var resultnumber;

        $scope.projects = [];

        $scope.getProjects = function(url) {

            url = url || apiProjectsUrl;

            $http.get(url, {cache: true})
            .success(function (data) {
                resultnumber = resultnumber + parseInt(data.objects.length);
                $scope.projects = $scope.projects.concat(data.objects);

                if ( data.pages.next ) {
                    $scope.getProjects(data.pages.next);
                }
            })
            .error(function (err) {
                // error stuff
                console.error(err);
            });
        };

        $scope.getProjects();

    };

    ProjectsController.$inject = ['$scope', '$http'];

    cfmIssuesApp.controller('issueController', ProjectsController);

}());
