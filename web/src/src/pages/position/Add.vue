<template>
    <div>
        <div class="col-12">
            <form @submit.prevent="save">
                <div v-if="progress" class="loading"></div>
                <div class="card">
                    <div class="card-header">
                        {{ $t("translation.addNewPosition") }}
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="title">
                                        {{ $t("translation.title") }}
                                    </label>
                                    <input
                                            id="title"
                                            v-model="positionTitle"
                                            type="text"
                                            :class="[errors.has('title') ? 'is-invalid' : '', 'form-control']"
                                            name="title"
                                            v-validate="validationRules.name"
                                            data-vv-validate-on="none"
                                            autofocus
                                    >
                                    <div v-show="errors.has('title')" class="invalid-feedback">
                                        {{ errors.first('title') }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <button
                                        type="submit"
                                        class="btn btn-success"
                                        :disabled="this.progress"
                                >
                                    {{ $t("translation.save") }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import positionMixin from '../../mixins/position';
    import validationMixin from '../../mixins/validation';

    export default {
        mixins: [
            positionMixin,
            validationMixin,
        ],
        metaInfo() {
            return {
                title: this.$t('translation.addPosition'),
            };
        },
        data() {
            return {
                progress: false,
            };
        },
        methods: {
            async save() {
                const valid = await this.$validator.validateAll();

                if (valid) {
                    this.progress = true;
                }

                try {
                    await this.$store.dispatch('position/store', {
                        title: this.positionTitle,
                    });

                    this.progress = false;
                    this.$router.go(-1);
                } catch (e) {
                    this.progress = false;
                }
            }
        },
    };
</script>
