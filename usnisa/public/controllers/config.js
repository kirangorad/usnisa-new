var baseURL = 'https://usnisa.in';
//var baseURL = 'https://localhost';

// Module specific configuration
angular.module('app.config',[])
  .value('app.config', {
    basePath: baseURL // Set your base path here
});
