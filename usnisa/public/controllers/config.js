var baseURL = 'http://usnisa.in';
//var baseURL = 'http://localhost:8000';

// Module specific configuration
angular.module('app.config',[])
  .value('app.config', {
    basePath: baseURL // Set your base path here
});
