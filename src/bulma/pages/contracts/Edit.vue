<template>
<div class="columns is-centered">
        <div class="column is-three-quarters">
            <enso-form ref="form"
                disable-state
                class="box has-background-light raises-on-hover"
                @loaded="ready = true"/>
            <accessories v-if="ready">
                <template slot-scope="{ count }">
                    <tab id="Additional Acts"
                         keep-alive>
                        <additional-acts :contract-id="$route.params.contract"
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
import { EnsoForm, Tab } from '@enso-ui/bulma';
import { Accessories, Documents } from '@enso-ui/accessories/bulma';
import AdditionalActs from './additionalActs/List.vue';

export default {
    name: 'Edit',

    components: {
        EnsoForm,
        Accessories,
        Documents,
        Tab,
        AdditionalActs,
    },

    data: () => ({
        ready: false,
    }),
};
</script>
