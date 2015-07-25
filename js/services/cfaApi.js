(function() {
   'use strict';

    cfmIssuesApp.factory('cfaApi', function($http, CacheFactory) {

        var cacheOneHour = 60 * 60 * 1000;

        var cache = CacheFactory('projectsCache', {
            "storageMode": "localStorage",
            "maxAge": cacheOneHour,
            "deleteOnExpire": "aggressive",
            "recycleFreq": cacheOneHour,
            "capacity": 10
        });

        var brigadeName = 'Code-for-Miami',
            apiProjectsUrl = 'http://codeforamerica.org/api/organizations/' + brigadeName + '/projects',
            resultnumber,
            projects = [];

        function getProjects(callback) {

            concatProjects();

            function concatProjects(url) {
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
                            callback(projects);
                        })
                        .error(function (err) {
                            console.error(err);
                        });
                } else {
                    callback( cache.get('projects') );
                }
            }

        }

        return {
            getProjects: getProjects
        };

    });

})();