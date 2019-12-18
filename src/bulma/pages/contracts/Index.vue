<template>
    <div class="wrapper">
        <div class="columns is-centered is-multiline"
            v-if="ready">
            <div class="column">
                <enso-input-filter class="box raises-on-hover"
                    v-model="params.contract_body"
                    :label="i18n('Text')"
                    :name="i18n('Contract Body')"/>
            </div>
            <div class="column">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.contracts.supplier_id"
                    source="administration.companies.options"
                    :name="i18n('Supplier')"/>
            </div>
            <div class="column">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.contracts.client_id"
                    source="administration.companies.options"
                    :name="i18n('Client')"/>
            </div>
            <div class="column is-narrow">
                <enso-date-filter class="box raises-on-hover"
                    v-model="params.dateInterval"
                    forward
                    direction
                    :name="i18n('Expires At')"
                    :interval="intervals.contracts.expires_at"/>
            </div>
        </div>
        <enso-table class="box is-paddingless raises-on-hover is-rounded"
            id="contracts"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @create-supplier="create('supplier')"
            @create-client="create('client')"
            @reset="$refs.filterState.reset()">
            <template v-slot:additionalActs="{ row }">
                <span class="icon has-text-primary">
                    <fa icon="file"/>
                </span>
                <span>
                    {{ row.additional_acts_count }}
                </span>
            </template>
        </enso-table>
        <filter-state name="contractFilters"
            :api-version="apiVersion"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @ready="ready = true"
            ref="filterState"/>
    </div>
</template>

<script>
import {
    EnsoTable, EnsoDateFilter, EnsoSelectFilter, FilterState, EnsoInputFilter,
} from '@enso-ui/bulma';

export default {
    name: 'Index',

    components: {
        EnsoTable, EnsoDateFilter, FilterState, EnsoSelectFilter, EnsoInputFilter,
    },

    inject: ['i18n', 'route'],

    data: () => ({
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
            dateInterval: 'nextThirtyDays',
            contract_body: '',
        },
    }),

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
