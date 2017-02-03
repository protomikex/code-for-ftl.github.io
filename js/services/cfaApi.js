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
            apiProjectsUrl = 'https://api.github.com/search/repositories?q=user:Code-for-Miami&per_page=100',
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

                            resultnumber = resultnumber + parseInt(data.items.length);
                            projects = projects.concat(data.items);

                            if ( data.pages && data.pages.next ) {
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

        function getIssues(pageCount, pageNumber) {
            var currentPage = pageNumber || 1;
            var apiUrl = 'https://api.github.com/search/issues?q=user:Code-for-Miami+state:open&per_page=' + pageCount + '&page=' + currentPage,
                options = {
                    headers: {
                        'user-agent': 'node.js'
                    }
                };

            return $http.get(apiUrl, options)
                .then(function (res) {
                    // console.log(res.data.items);
                    return res.data;
                });
        }

        return {
            getProjects: getProjects,
            getIssues: getIssues
        };

    });

})();