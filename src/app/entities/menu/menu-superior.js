(function () {
  'use strict';

  angular
    .module('manutencao')
    .controller('MenuSuperiorController', MenuSuperiorController);

  function MenuSuperiorController() {
    var vm = this;
    vm.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado')); 

    vm.sair = function (retornoLogin) {
      window.localStorage.removeItem('usuarioLogado');
    }
  }

})();
