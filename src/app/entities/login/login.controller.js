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

    vm.abrirModalCadastroUsuario = function () {
      $uibModal.open({
        ariaLabelledBy: 'Cadastro de usuário',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/entities/usuario/novo-usuario/novo-usuario.html',
        controller: 'NovoUsuarioController',
        controllerAs: 'vm',
        size: 'md'
      });
    }

    vm.logar = function() {
      if (!vm.loginValido()) {
        toastr.error("Nem todas as informações de login estão corretas.");
        return;
      }

      var logar = Restangular.all("usuarios");
      logar.post(vm.login).then(function(retornoLogin) {
        if (retornoLogin.sucesso) {
          vm.armazenarLocalmenteUsuarioLogado(retornoLogin);
          retornoLogin.objeto.perfil === "USUARIO" ? $location.path('menu-usuario') : $location.path('menu-fornecedor');
        } else {
          toastr.error(retornoLogin.mensagem);
        }
      });
    }

    vm.loginValido = function() {
      return vm.login.email || vm.login.senha ? true : false; 
    }

    vm.armazenarLocalmenteUsuarioLogado = function(retornoLogin) {
      window.localStorage.setItem('usuarioLogado', JSON.stringify(retornoLogin.objeto.id));
    }
  }
})();
