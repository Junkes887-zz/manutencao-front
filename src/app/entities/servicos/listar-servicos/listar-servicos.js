(function () {
    'use strict';

    angular
        .module('manutencao')
        .controller('abrirModalGerarServico', abrirModalGerarServico);

    abrirModalGerarServico.$inject = [
        '$uibModal',
        'Restangular',
        'toastr'
    ];

    function abrirModalGerarServico($uibModal,Restangular, toastr) {
        var vm = this;

        vm.listarServico = function () {
            var servico = Restangular.all("servico/listar-servico");
            servico.post().then(function (response) {
                if (response.sucesso) {
                    vm.gridOptions.data = response.objeto;
                } else {
                    toastr.error(response.mensagem);
                }
            });
        }

        vm.abrirModalGerarServico = function () {
            $uibModal.open({
                ariaLabelledBy: 'Usuario',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/servico/criar-servico/criar-servico.html',
                controller: 'CriarServicoController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    usuario: function() {
                        return usuario;
                    }
                }
            }).result.then(function() {
                vm.listarUsuarios();
            });
        }

        vm.abrirModalUsuario = function(usuario) {
            $uibModal.open({
                ariaLabelledBy: 'Usuario',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/usuario/editar-usuario/editar-usuario.html',
                controller: 'EditarUsuarioController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    usuario: function() {
                        return usuario;
                    }
                }
            }).result.then(function() {
                vm.listarUsuarios();
            });
        }

        vm.gridOptions = {
            data: vm.listarUsuarios(),
            enableFiltering: true,
            enableColumnMenus: false,
            paginationPageSizes: [10, 25, 50, 100, 250, 500],
            columnDefs: [{
                name: 'Edit',
                width: '5%',
                enableFiltering: false,
                cellTemplate: '<div ng-class="\'ui-grid-cell-contents text-center\'">\
                                \<button type="button" ng-click="grid.appScope.vm.abrirModalUsuario(row.entity, true)" ng-class="\'btn btn-xs label label-warning\'">\
                                    Editar </div>\
                                </button>\
                            </div>'
            }, {
                width: '10%',
                name: 'Código',
                field: 'id',
                type: 'text'
            }, {
                width: '25%',
                name: 'Nome',
                field: 'nome',
                type: 'text'
            }, {
                width: '25%',
                name: 'senha',
                field: 'senha',
                type: 'text'
            }, {
                width: '25%',
                name: 'Email',
                field: 'email',
                type: 'text'
            }, {
                width: '17%',
                name: 'Permissão',
                field: 'permissao',
                type: 'text'
            }]
        }
    }
})();
