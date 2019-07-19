(function () {
  'use strict';

  angular
    .module('manutencao')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    '$uibModal',
    '$location',
    'Restangular',
    'toastr'
  ];

  function LoginController($uibModal, $location, Restangular, toastr) {
    var vm = this;
    vm.login = {
      email: "",
      senha: ""
    }

    vm.logar = function() {
      if (!vm.loginValido()) {
        toastr.error("Nem todas as informações de login estão corretas.");
        return;
      }

      var logar = Restangular.all("usuarios/login");
      logar.post(vm.login).then(function(retornoLogin) {
        if (retornoLogin.sucesso) {
          vm.armazenarLocalmenteUsuarioLogado(retornoLogin.objeto);
          retornoLogin.objeto.permissao === 1 ? $location.path('home-usuario') : $location.path('home-adm');
        } else {
          toastr.error(retornoLogin.mensagem);
        }
      });
    }

    vm.loginValido = function() {
      return vm.login.email || vm.login.senha ? true : false; 
    }

    vm.armazenarLocalmenteUsuarioLogado = function(retornoLogin) {
      window.localStorage.setItem('usuarioLogado', JSON.stringify(retornoLogin));
    }

    function inicializar() {
      var usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
      console.log(usuarioLogado);
      if (usuarioLogado) {
        vm.login = usuarioLogado;
        vm.logar();
      }
    }
    inicializar();
  }
})();
