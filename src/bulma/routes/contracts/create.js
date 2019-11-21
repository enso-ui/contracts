const ContractCreate = () => import('../../pages/contracts/Create.vue');

export default {
    name: 'contracts.create',
    path: 'create',
    component: ContractCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Contract',
    },
};
