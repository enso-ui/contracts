const ContractForm = () => import('../../pages/contracts/Form.vue');

export default {
    name: 'contracts.create',
    path: 'create',
    component: ContractForm,
    meta: {
        breadcrumb: 'create',
        title: 'Create Contract',
    },
};
