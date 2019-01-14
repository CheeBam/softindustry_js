<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">
                        {{ $t("translation.importOrders") }}
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <form>
                                    <div class="form-group">
                                        <label for="file">{{ $t("translation.chooseJsonFile") }}</label>
                                        <input ref="file" type="file" class="form-control-file" accept=".json" id="file" @input="processFile">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div v-if="status" class="card-footer text-muted">
                        {{ status }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        metaInfo() {
            return {
                title: this.$t('translation.importOrders'),
            };
        },
        data() {
            return {
                file: null,
                status: null,
            };
        },
        methods: {
            async processFile() {
                this.status = null;
                let file = this.$refs.file.files[0];

                if (file) {
                    let reader = new FileReader();
                    reader.readAsText(file, 'UTF-8');

                    reader.onload = async (e) => {
                        try {
                            await this.$store.dispatch('order/downloadJson', {
                                params: {
                                    file: e.target.result,
                                }
                            });
                            this.status = this.$t('translation.fileUploadedSuccessfully');
                        } catch (e) {
                            this.status = this.$t('translation.fileNotLoaded');
                            console.log(e);
                        }
                    }
                }

            },
        },
        beforeDestroy() {
           this.status = null;
        },
    };
</script>
