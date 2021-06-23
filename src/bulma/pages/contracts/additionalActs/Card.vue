<template>
    <div class="box has-background-light raises-on-hover file-box p-3">
        <avatar class="is-32x32"
            :user="additionalAct.owner"/>
        <h5 v-tooltip="additionalAct.title"
            class="title is-5 filename has-text-centered">
            {{ additionalAct.title }}
        </h5>
        <figure class="files">
            <span class="tag is-dark counter">
                {{additionalAct.documentCount}}
            </span>
        </figure>
        <p v-tooltip="timeFromNow(additionalAct.signed_at)"
           class="has-text-centered">
            <span class="icon is-small">
                <fa icon="calendar-alt"/>
            </span>
            {{ date(additionalAct.signed_at) }}
        </p>
        <div class="has-text-centered has-margin-top-medium">
            <div class="details">
                <a class="button is-naked is-small"
                    @click.stop="$emit('edit')"
                    v-if="canAccess('contracts.additionalActs.edit')">
                    <span class="icon">
                        <fa icon="pencil-alt"/>
                    </span>
                </a>
                <confirmation placement="top"
                    @show="confirmation = true"
                    @hide="confirmation = false"
                    @confirm="$emit('delete', additionalAct)">
                    <a v-if="canAccess('contracts.additionalActs.destroy')"
                       class="button is-naked is-small">
                        <span class="icon">
                            <fa icon="trash-alt"/>
                        </span>
                    </a>
                </confirmation>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/pro-solid-svg-icons';
import { VTooltip } from 'v-tooltip';
import { files } from '@enso-ui/mixins';
import formatDistance from '@enso-ui/ui/src/modules/plugins/date-fns/formatDistance';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';
import Confirmation from '@enso-ui/confirmation/bulma';
import Avatar from '@enso-ui/ui/src/bulma/pages/administration/users/components/Avatar.vue';

library.add(faEye, faPencilAlt);

export default {
    name: 'Card',

    inject: ['canAccess', 'errorHandler', 'route'],

    directives: { tooltip: VTooltip },

    components: { Confirmation, Avatar },

    mixins: [files],

    props: {
        additionalAct: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        confirmation: null,
    }),

    methods: {
        link() {
            axios.get(this.route('core.files.link', this.file.id))
                .then(({ data }) => (this.temporaryLink = data.link))
                .catch(this.errorHandler);
        },
        show() {
            if (this.file.mimeType === 'application/pdf') {
                this.preview = this.file;
                return;
            }

            window.open(this.route('core.files.show', this.file.id), '_blank').focus();
        },
        timeFromNow(date) {
            return formatDistance(date);
        },
        date(date) {
            return format(date);
        },
    },
};
</script>

<style lang="scss" scoped>
    .file-box {
        position: relative;
        cursor: pointer;

        .avatar {
            position: absolute;
            top: .6em;
            left: .6em;
        }

        .files {
            position: absolute;
            top: .6em;
            right: .6em;
        }

        .details {
            display: flex;
            justify-content: center;
        }

        .title.filename {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>
