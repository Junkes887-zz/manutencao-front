(function () {
  'use strict';

  angular
    .module('manutencao')
    .controller('EditarUsuarioController', EditarUsuarioController);

  EditarUsuarioController.$inject = [
    '$uibModal',
    '$uibModalInstance',
    '$location',
    'Restangular',
    'toastr',
    'usuario'
  ];

  function EditarUsuarioController($uibModal, $uibModalInstance, $location, Restangular, toastr, usuario) {
    var vm = this;
    if (!!usuario) {
      vm.usuario = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        permissao: usuario.permissao
      }
    }

    vm.editarUsuario = function () {
      var editarUsuario = Restangular.all("usuarios/editar-usuario");
      editarUsuario.post(vm.usuario).then(function (retornoCadastro) {
        if (retornoCadastro.sucesso) {
          toastr.success(retornoCadastro.mensagem);
          $uibModalInstance.close(true);
        } else { toastr.error("Erro ao salvar"); }
      })
    }
  }
})();
