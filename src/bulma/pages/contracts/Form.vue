<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters">
            <enso-form disable-state
                class="box has-background-light raises-on-hover"
                @loaded="ready = true"
                :params="params"
                :path="path"
                ref="form">
                <template v-slot:expires_at="props">
                    <form-field v-bind="props"/>
                </template>
                <template v-slot:renews_automatically="props">
                    <form-field v-bind="props"
                        @input="$refs.form.field('expires_at').meta.hidden = $event"/>
                </template>
            </enso-form>
            <accessories v-if="isEdit && ready">
                <template slot-scope="{ count }">
                    <tab id="Additional Acts"
                         keep-alive>
                        <additional-acts :contract="$refs.form.formData"
                            @update="$set(count, 'Additional Acts', $event)"
                            @expires="$refs.form.field('expires_at').value = $event"/>
                    </tab>
                    <tab id="Files"
                        keep-alive>
                        <div class="column  is-centered">
                            <documents :id="$route.params.contract"
                                ref="documents"
                                type="LaravelEnso\Contracts\app\Models\Contract"
                                @update="$set(count, 'Files', $refs.documents.count)"/>
                        </div>
                    </tab>
                </template>
            </accessories>
        </div>
    </div>
</template>

<script>
import { EnsoForm, Tab, FormField, } from '@enso-ui/bulma';
import { Accessories, Documents } from '@enso-ui/accessories/bulma';
import AdditionalActs from './additionalActs/List.vue';
import {mapState} from "vuex";

export default {
    name: 'Form',

    inject: ['route'],

    components: {
        EnsoForm,
        Accessories,
        Documents,
        Tab,
        AdditionalActs,
        FormField,
    },

    data: () => ({
        ready: false,
    }),

    computed: {
        ...mapState(['enums']),
        isEdit() {
            return this.$route.params.contract !== undefined;
        },
        path() {
            return this.isEdit
                ? this.route('contracts.edit', {contract: this.$route.params.contract})
                : this.route('contracts.create');
        },
        params() {
            return this.isEdit
                ? {}
                : {type: this.$route.params.type || this.enums.contractParties.client};
        },
    },
};
</script>
