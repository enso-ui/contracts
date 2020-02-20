<template>
    <modal class="additional-act-modal"
        show
        v-on="$listeners">
        <div class="has-background-white">
            <enso-form class="box has-background-light"
                :path="path"
                disable-state
                v-on="$listeners"
                @ready="init">
                <template v-slot:expires_at="props">
                    <form-field :field="field"
                        v-bind="props"/>
                </template>
                <template v-slot:extends_contract="props"
                    v-if="!contract.renews_automatically" >
                    <form-field v-bind="props"
                        @input="form.field('expires_at').meta.hidden = !$event"/>
                </template>
            </enso-form>
            <accessories class="box accessories"
                v-if="form && isEdit">
                <template slot-scope="{ count }">
                    <tab id="Files"
                        keep-alive>
                        <div class="column is-centered">
                            <documents :id="additionalAct.id"
                                ref="documents"
                                type="LaravelEnso\Contracts\App\Models\AdditionalAct"
                                @update="$set(count, 'Files', $refs.documents.count)"/>
                        </div>
                    </tab>
                </template>
            </accessories>
        </div>
</modal>
</template>

<script>
import { mapState } from 'vuex';
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import { Modal } from '@enso-ui/modal/bulma';
import { Tab } from '@enso-ui/tabs/bulma';
import { Accessories, Documents } from '@enso-ui/accessories/bulma';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';

export default {
    name: 'BaseForm',

    components: {
        Modal, EnsoForm, Accessories, Documents, Tab, FormField,
    },

    inject: ['i18n', 'route'],

    props: {
        additionalAct: {
            type: Object,
            required: true,
            defaults: {},
        },
        contract: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        confirm: null,
        form: false,
    }),

    computed: {
        ...mapState(['meta', 'enums']),
        isEdit() {
            return this.additionalAct.id;
        },
        path() {
            return this.isEdit
                ? this.route('contracts.additionalActs.edit', { additionalAct: this.additionalAct.id })
                : this.route('contracts.additionalActs.create');
        },
        expiresAt() {
            return this.form && this.form.field('expires_at').value;
        },
        extendsContract() {
            return this.form && this.form.field('extends_contract').value;
        },
        documentCount() {
            return this.isEdit
                ? this.$refs.documents.count
                : 0;
        },
    },

    methods: {
        init({ form }) {
            this.form = form;
            this.form.field('contract_id').value = this.$route.params.contract;
        },
        date(date) {
            return format(date, 'Y-m-d');
        },
    },
};
</script>

<style lang="scss" >
    .additional-act-modal .modal-content {
        width: 850px;
    }
    .accessories {
        margin-top: 10px;
    }
</style>
