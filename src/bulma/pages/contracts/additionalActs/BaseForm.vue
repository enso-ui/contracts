<template>
    <modal class="additional-act-modal"
           show
           v-on="$listeners">
        <div class="has-background-white">
            <enso-form ref="form"
                class="box has-background-light"
                :path="path"
                disable-state
                v-on="$listeners"
                @ready="init">
                <template v-slot:expires_at="props">
                    <form-field v-bind="props"
                        :field="field"/>
                </template>
                <template v-slot:extends_contract="props">
                    <form-field v-bind="props"
                        @input="$refs.form.field('expires_at').meta.hidden = !$event"/>
                </template>
            </enso-form>
            <accessories v-if="ready && isEdit" class="box accessories">
                <template slot-scope="{ count }">
                    <tab id="Files"
                         keep-alive>
                        <div class="column is-centered">
                            <documents :id="contractId"
                                ref="documents"
                                type="LaravelEnso\Contracts\app\Models\AdditionalAct"
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
import {
    Modal, EnsoForm, Tab, FormField,
} from '@enso-ui/bulma';
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
        contractId: {
            required: true,
        },
    },

    data: () => ({
        confirm: null,
        ready: false,
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
            return this.$refs.form.field('expires_at').value;
        },
        extendsContract() {
            return this.$refs.form.field('extends_contract').value;
        },
    },

    methods: {
        init({ form }) {
            form.field('contract_id').value = this.contractId;
            this.ready = true;
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
