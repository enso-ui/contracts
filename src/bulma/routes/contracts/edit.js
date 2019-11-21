const ContractEdit = () => import('../../pages/contracts/Edit.vue');

export default {
    name: 'contracts.edit',
    path: ':contract/edit',
    component: ContractEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Contract',
    },
};
