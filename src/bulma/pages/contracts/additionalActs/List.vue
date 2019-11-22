<template>
    <div class="additional-act-wrapper">
        <div>
            <div class="field is-grouped">
                    <p class="control">
                        <a v-if="canAccess('contracts.additionalActs.create')"
                           class="button is-rounded is-small is-bold is-info"
                           @click="create()">
                            <span>
                                {{ i18n('New') }}
                            </span>
                            <span class="icon">
                                <fa icon="plus"/>
                            </span>
                        </a>
                    </p>
                    <p class="control has-icons-left has-icons-right is-expanded">
                        <input v-model="query"
                               class="input is-rounded is-small is-expanded"
                               type="text"
                               :placeholder="i18n('Filter')">
                        <span class="icon is-small is-left">
                            <fa icon="search"/>
                        </span>
                        <span v-if="query"
                              class="icon is-small is-right clear-button"
                              @click="query = ''">
                            <a class="delete is-small"/>
                        </span>
                    </p>
                    <p class="control">
                        <a class="button is-rounded is-small is-bold has-margin-left-medium"
                           @click="fetch()">
                            <span>
                                {{ i18n('Reload') }}
                            </span>
                            <span class="icon">
                                <fa icon="sync"/>
                            </span>
                        </a>
                    </p>
            </div>
            <div class="columns is-multiline has-margin-top-large">
            <div v-for="(additionalAct, index) in filteredAdditionalActs"
                 :key="additionalAct.id"
                 class="column is-half-touch is-half-desktop is-one-third-widescreen">
                <card :additional-act="additionalAct"
                    @click="edit(additionalAct)"
                    @edit="edit(additionalAct)"
                    @delete="remove(index)"/>
            </div>
        </div>
        </div>

        <base-form v-if="additionalAct"
            ref="form"
            :additional-act="additionalAct"
            :contract-id="contractId"
            @submit="update"
            @close="additionalAct = null"
            @destroy="additionalAct = null"/>
    </div>
</template>

<script>

import Card from './Card.vue';
import BaseForm from './BaseForm.vue';

export default {
    name: 'List',

    inject: ['canAccess', 'errorHandler', 'route', 'i18n'],

    components: { Card, BaseForm },

    props: {
        contractId: {
            required: true,
        },
    },

    data: () => ({
        additionalActs: [],
        additionalAct: null,
        query: '',
    }),

    computed: {
        filteredAdditionalActs() {
            const query = this.query.toLowerCase();

            return query
                ? this.additionalActs.filter(({ title, description }) => `${title} ${description}`
                    .toLowerCase().indexOf(query) >= 0)
                : this.additionalActs;
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            axios.get(this.route('contracts.additionalActs.index'), {
                params: { contractId: this.contractId },
            }).then(({ data }) => {
                this.additionalActs = data;
                this.$emit('update', this.additionalActs.length);
            }).catch(error => this.errorHandler(error));
        },
        create() {
            this.additionalAct = {};
        },
        edit(additionalAct) {
            this.additionalAct = additionalAct;
        },
        remove(index) {
            axios.delete(this.route('contracts.additionalActs.destroy',
                { additionalAct: this.additionalActs[index].id }))
                .then(() => {
                    this.additionalActs.splice(index, 1);
                    this.$emit('update', this.additionalActs.length);
                })
                .catch(error => this.errorHandler(error));
        },
        update() {
            this.fetch();
            this.additionalAct = null;

            if (this.$refs.form.extendsContract) {
                this.$emit('expires', this.$refs.form.expiresAt);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
