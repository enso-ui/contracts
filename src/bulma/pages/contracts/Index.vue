<template>
    <div class="wrapper">
        <div v-if="ready"
             class="columns is-centered is-multiline">
            <div class="column">
                <enso-select-filter v-model="params.businessDomainIds"
                    multiple
                    class="box raises-on-hover"
                    source="administration.businessDomains.options"
                    :name="i18n('Business Domain')"/>
            </div>
            <div class="column">
                <enso-select-filter v-model="filters.contracts.supplier_id"
                    class="box raises-on-hover"
                    source="administration.companies.options"
                    :name="i18n('Supplier')"/>
            </div>
            <div class="column">
                <enso-select-filter v-model="filters.contracts.client_id"
                    class="box raises-on-hover"
                    source="administration.companies.options"
                    :name="i18n('Client')"/>
            </div>
            <div class="column is-narrow">
                <enso-date-filter v-model="params.dateInterval"
                    class="box raises-on-hover"
                    forward
                    direction
                    :name="i18n('Expires At')"
                    :interval="intervals.contracts.expires_at"/>
            </div>
        </div>
        <enso-table id="contracts"
            class="box is-paddingless raises-on-hover is-rounded"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @create-supplier="create('supplier')"
            @create-client="create('client')"
            @reset="$refs.filterState.reset()">
            <template v-slot:businessDomains="{ row }">
                <span v-for="businessDomain in row.businessDomainsArray"
                    :key="businessDomain"
                    class="tag is-table-tag is-info has-margin-right-small">
                    {{ businessDomain }}
                </span>
            </template>
        </enso-table>
        <filter-state ref="filterState"
            name="contractFilters"
            :api-version="apiVersion"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @ready="ready = true"/>
    </div>
</template>

<script>
import {
    EnsoTable, EnsoDateFilter, EnsoSelectFilter, FilterState,
} from '@enso-ui/bulma';

export default {
    name: 'Index',

    components: {
        EnsoTable, EnsoDateFilter, FilterState, EnsoSelectFilter,
    },

    inject: ['i18n', 'route'],

    data() {
        return {
            apiVersion: 1.2,
            ready: false,
            filters: {
                contracts: {
                    supplier_id: null,
                    client_id: null,
                },
            },
            intervals: {
                contracts: {
                    expires_at: {
                        min: null,
                        max: null,
                    },
                },
            },
            params: {
                businessDomainIds: [],
                dateInterval: 'nextThirtyDays',
            },
        };
    },

    methods: {
        create(type) {
            this.$router.push({
                name: 'contracts.create',
                params: { type },
            });
        },
    },
};

</script>
