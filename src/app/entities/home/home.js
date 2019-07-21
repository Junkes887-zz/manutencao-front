(function () {
    'use strict';
  
    angular
      .module('manutencao')
      .controller('HomeController', HomeController);
  
    function HomeController() {
      var vm = this;
      vm.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
      console.log(vm.usuarioLogado);
    }
  
  })();
  