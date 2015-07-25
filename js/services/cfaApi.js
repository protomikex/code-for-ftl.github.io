(function() {
   'use strict';

    cfmIssuesApp.factory('cfaApi', function($http, $cacheFactory) {

        var cache = $cacheFactory('projectsCache');

        var brigadeName = 'Code-for-Miami',
            apiProjectsUrl = 'http://codeforamerica.org/api/organizations/' + brigadeName + '/projects',
            resultnumber,
            projects = [];

        function getProjects(callback) {

            concatProjects();

            function concatProjects(url) {
                console.log('starting concatProjects');
                console.log('cache', cache.get('projects'));

                // if no cached data, make http req
                // else use cache data
                if (!cache.get('projects')) {
                    var apiUrl = url || apiProjectsUrl;

                    $http.get(apiUrl)
                        .success(function (data) {

                            resultnumber = resultnumber + parseInt(data.objects.length);
                            projects = projects.concat(data.objects);

                            if ( data.pages.next ) {
                                concatProjects(data.pages.next);
                                return;
                            }

                            cache.put('projects', projects);
                            console.log('cache put', cache.get('projects'));
                            callback(projects);
                        })
                        .error(function (err) {
                            console.error(err);
                        });
                } else {
                    console.log('getting cache', cache.get('projects'));
                    callback( cache.get('projects') );
                }
            }

        }

        return {
            getProjects: getProjects
        };

    });

})();