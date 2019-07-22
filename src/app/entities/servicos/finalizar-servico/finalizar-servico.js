(function () {
    'use strict';

    angular
        .module('manutencao')
        .controller('FinalizarServicoController', FinalizarServicoController);

    FinalizarServicoController.$inject = [
        '$uibModal',
        '$uibModalInstance',
        '$location',
        'Restangular',
        'toastr',
        'servico'
    ];

    function FinalizarServicoController($uibModal, $uibModalInstance, $location, Restangular, toastr, servico) {
        var vm = this;
        if (!!servico) {
            vm.servico = {
                id: servico.id,
                data_ini: servico.data_ini,
                data_fim: servico.data_fim,
                descricao: servico.descricao,
                id_cliente: servico.id_cliente,
                cliente: servico.cliente,
                status: "FINALIZADO",
                valor: servico.valor,
                marca: servico.marca,
                tipo: servico.tipo,
                prioridade: servico.prioridade,
                id_responsavel: JSON.parse(window.localStorage.getItem('usuarioLogado')).id,
                responsavel: JSON.parse(window.localStorage.getItem('usuarioLogado')).nome,
                observacao: ""
            }
        }

        vm.finalizarServico = function () {
            if (!vm.servico.observacao) {
                toastr.error("O campo observação não pode ser nulo!");
                return;
            } if (!vm.servico.valor || vm.servico.valor <= 0) {
                toastr.error("O campo valor tem que ser maior que 0!");
                return;
            }

            var finalizarServico = Restangular.all("servico/editar-servico");
            finalizarServico.post(vm.servico).then(function (retornoCadastro) {
                if (retornoCadastro.sucesso) {
                    toastr.success(retornoCadastro.mensagem);
                    $uibModalInstance.close(true);
                } else { toastr.error("Erro ao salvar"); }
            })
        }
    }
})();
