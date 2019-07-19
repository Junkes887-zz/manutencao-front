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
      .when('/menu-usuario', {
        templateUrl: 'app/entities/usuario/menu-usuario/menu-usuario.html'
      })
      .when('/menu-fornecedor', {
        templateUrl: 'app/entities/fornecedor/menu-fornecedor/menu-fornecedor.html'
      })
      .when('/home-adm', {
        templateUrl: 'app/entities/home/home-adm.html'
      })
      .when('/home-usuario', {
        templateUrl: 'app/entities/home/home-usuario.html'
      })
      .when('/listar-usuarios', {
        templateUrl: 'app/entities/usuario/listar-usuarios/listar-usuarios.html'
      })
      .when('/gerenciar-produtos', {
        templateUrl: 'app/entities/produto/gerenciar-produtos/gerenciar-produtos.html'
      })
      .when('/produtos-cotados', {
        templateUrl: 'app/entities/produto/produtos-cotados/produtos-cotados.html'
      })
      .when('/gerenciar-lances', {
        templateUrl: 'app/entities/fornecedor/gerenciar-lances/gerenciar-lances.html'
      })
      .when('/listar-fornecedores', {
        templateUrl: 'app/entities/usuario/listar-fornecedores/listar-fornecedores.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
