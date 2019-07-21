(function() {
  'use strict';

  angular
    .module('manutencao')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/entities/login/login.html'
      })
      .when('/home', {
        templateUrl: 'app/entities/home/home.html'
      })
      .when('/listar-usuarios', {
        templateUrl: 'app/entities/usuario/listar-usuarios/listar-usuarios.html'
      })
      .when('/listar-servicos', {
        templateUrl: 'app/entities/usuario/listar-servicos/listar-servicos.html'
      })
      .when('/listar-clientes', {
        templateUrl: 'app/entities/cliente/listar-clientes/listar-clientes.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
