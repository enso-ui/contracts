import routeImporter from '@core/modules/importers/routeImporter';

const routes = routeImporter(require.context('./contracts', false, /.*\.js$/));
const RouterView = () => import('@core/bulma/pages/Router.vue');

export default {
    path: '/contracts',
    component: RouterView,
    meta: {
        breadcrumb: 'contracts',
    },
    children: routes,
};
