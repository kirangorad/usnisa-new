var baseURL = 'http://usnisa.in:8000';
//var baseURL = 'http://52.66.21.137';
//var baseURL = 'http://localhost:8000';

// Module specific configuration
angular.module('app.config',[])
  .value('app.config', {
    basePath: baseURL // Set your base path here
});
