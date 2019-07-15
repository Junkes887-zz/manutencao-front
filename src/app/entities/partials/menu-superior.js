(function () {
    'use strict';
  
    angular
      .module('manutencao')
      .controller('MenuSuperiorController', MenuSuperiorController);
  
    function MenuSuperiorController() {
      var vm = this;
  
      vm.sair = function(retornoLogin) {
        window.localStorage.removeItem('usuarioLogado');
      }
    }
  })();
  