const ContractForm = () => import('../../pages/contracts/Form.vue');

export default {
    name: 'contracts.edit',
    path: ':contract/edit',
    component: ContractForm,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Contract',
    },
};
