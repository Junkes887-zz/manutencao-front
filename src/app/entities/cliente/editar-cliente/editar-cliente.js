(function () {
  'use strict';

  angular
    .module('manutencao')
    .controller('EditarClienteController', EditarClienteController);

  EditarClienteController.$inject = [
    '$uibModal',
    '$uibModalInstance',
    '$location',
    'Restangular',
    'toastr',
    'cliente'
  ];

  function EditarClienteController($uibModal, $uibModalInstance, $location, Restangular, toastr, cliente) {
    var vm = this;
    if (!!cliente) {
      vm.cliente = {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        endereco: cliente.endereco,
        telefone: cliente.telefone
      }
    }

    vm.editarCliente = function () {
      if (!vm.cliente.nome) {
        toastr.error("O campo nome é obrigatório!");
        return;
      } if (!vm.cliente.endereco) {
        toastr.error("O campo endereço é obrigatório!");
        return;
      } if (!vm.telefoneValido()) {
        toastr.error("O numero de telefone não é valido!");
        return;
      } if (!vm.emailValido()) {
        toastr.error("O email não é valido!");
        return;
      }

      var editarCliente = Restangular.all("cliente/editar-cliente");
      editarCliente.post(vm.cliente).then(function (retornoCadastro) {
        if (retornoCadastro.sucesso) {
          toastr.success(retornoCadastro.mensagem);
          $uibModalInstance.close(true);
        } else { toastr.error("Erro ao salvar"); }
      })
    }

    vm.telefoneValido = function () {
      var regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
      return regex.test(vm.cliente.telefone);
    }

    vm.emailValido = function () {
      var regex = new RegExp('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$');
      return regex.test(vm.cliente.email);
    }

  }
})();
