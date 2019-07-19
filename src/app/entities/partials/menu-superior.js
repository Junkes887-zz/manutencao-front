(function () {
  'use strict';

  angular
    .module('manutencao')
    .controller('MenuSuperiorController', MenuSuperiorController);

  function MenuSuperiorController() {
    var vm = this;
    vm.nomeUsuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado')).nome;

    vm.sair = function (retornoLogin) {
      window.localStorage.removeItem('usuarioLogado');
    }
  }

})();
