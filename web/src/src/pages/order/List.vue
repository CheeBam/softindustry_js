<template>
    <div class="row d-flex">
        <div class="col-12">
            <div v-if="progress" class="loading"></div>

            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="input-group mb-3">
                        <input type="text" v-model="searchText" class="form-control" :placeholder="$t('translation.search')" aria-label="" aria-describedby="basic-addon">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" @click="onFilterReset" type="button">{{ $t("translation.reset") }}</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <multiselect v-model="filter.type"
                                 :options="typeOptions"
                                 label="title"
                                 track-by="id"
                                 :multiple="false"
                                 :select-label="$t('translation.select')"
                                 :placeholder="$t('translation.filterByType')"
                                 :allow-empty="true"
                                 @input="makeTypeFilter"
                    >
                    </multiselect>
                </div>
                <div class="col-md-3 col-sm-6">
                    <multiselect v-model="filter.status"
                                 :options="statusOptions"
                                 label="title"
                                 track-by="id"
                                 :multiple="false"
                                 :select-label="$t('translation.select')"
                                 :placeholder="$t('translation.filterByStatus')"
                                 :allow-empty="true"
                                 @select="makeStatusFilter"
                    >
                    </multiselect>
                </div>
            </div>

            <vuetable
                    ref="vuetable"
                    :api-url="`${baseUrl}/api/v1/orders`"
                    data-path="data"
                    pagination-path=""
                    :append-params="queryParams"
                    :fields="fields"
                    :css="css.table"
                    :http-options="{
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        },
                    }"
                    @vuetable:loading="progress = true"
                    @vuetable:loaded="tableLoaded"
                    @vuetable:pagination-data="onPaginationData">

                <template slot="fullname" slot-scope="props">
                    <p>{{ props.rowData.customer.name }} {{ props.rowData.customer.surname }}</p>
                </template>

                <template slot="actions" slot-scope="props">
                    <button v-if="props.rowData.can_edit" class="btn btn-custom btn-custom--edit" type="button" @click="edit(props.rowData)"></button>
                    <template v-if="authLogged">
                        <button v-if="props.rowData.status_id === constants.STATUS_PROCESS" class="btn btn-custom btn-custom--confirm" type="button" @click="changeStatus(props.rowData.id, constants.STATUS_CONFIRMED)"></button>
                        <template v-if="props.rowData.status_id === constants.STATUS_CONFIRMED">
                            <button class="btn btn-custom btn-custom--done" type="button" @click="changeStatus(props.rowData.id, constants.STATUS_DONE)"></button>
                            <button class="btn btn-custom btn-custom--fail" type="button" @click="changeStatus(props.rowData.id, constants.STATUS_FAILED)"></button>
                        </template>
                    </template>
                </template>

            </vuetable>
            <vuetable-pagination
                    ref="pagination"
                    :css="css.pagination"
                    @vuetable-pagination:change-page="onChangePage"
            >
            </vuetable-pagination>
        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    import Vuetable from 'vuetable-2/src/components/Vuetable.vue';
    import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
    import debounce from '../../utils/helper';
    import authMixin from '../../mixins/auth';
    import * as constants from '../../utils/constants';

    export default {
        components: {
            Multiselect,
            Vuetable,
            VuetablePagination,
        },
        mixins: [ authMixin ],
        computed: {
            baseUrl() {
                return `${window.location.protocol}//api.${window.location.hostname}`;
            },
        },
        data() {
            return {
                constants,
                fields: [
                    {
                        name: 'created_at',
                        sortField: 'created_at',
                        title: this.$t('translation.date'),
                        titleClass: 'text-center col',
                        dataClass: 'text-center middle index text-nowrap',
                        width: '15%',
                    },
                    {
                        name: 'sys_id',
                        sortField: 'sys_id',
                        title: this.$t('translation.sysID'),
                        titleClass: 'text-center text-nowrap col',
                        dataClass: 'text-center middle index text-nowrap',
                        width: '15%',
                    },
                    {
                        name: 'type.title',
                        sortField: 'order_type_id',
                        title: this.$t('translation.type'),
                        titleClass: 'text-center col',
                        dataClass: 'text-center middle index',
                        width: '25%',
                    },
                    {
                        name: '__slot:fullname',
                        sortField: 'customer_id',
                        title: this.$t('translation.customer'),
                        titleClass: 'text-center col',
                        dataClass: 'text-center middle index text-nowrap',
                        width: '25%',
                    },
                    {
                        name: 'provider.company',
                        sortField: 'company_id',
                        title: this.$t('translation.provider'),
                        titleClass: 'text-center col',
                        dataClass: 'text-center middle index',
                        width: '15%',
                    },
                    {
                        name: 'due_date',
                        sortField: 'due_date',
                        title: this.$t('translation.dueDate'),
                        titleClass: 'text-center text-nowrap col',
                        dataClass: 'text-center middle index text-nowrap',
                        width: '15%',
                    },
                    {
                        name: 'status.title',
                        sortField: 'status_id',
                        title: this.$t('translation.status'),
                        titleClass: 'text-center col',
                        dataClass: 'text-center middle index',
                        width: '15%',
                    },
                    {
                        name: '__slot:actions',
                        title: this.$t('translation.actions'),
                        titleClass: 'text-center col',
                        dataClass: 'text-center middle index text-nowrap',
                        width: '15%',
                    },
                ],
                css: {
                    table: {
                        tableClass: 'table',
                        loadingClass: 'loading',
                        ascendingIcon: 'glyphicon glyphicon-chevron-up',
                        descendingIcon: 'glyphicon glyphicon-chevron-down',
                        handleIcon: 'glyphicon glyphicon-menu-hamburger',
                    },
                    pagination: {
                        infoClass: 'pull-left',
                        wrapperClass: 'vuetable-pagination',
                        activeClass: 'btn-primary',
                        disabledClass: 'disabled',
                        pageClass: 'btn btn-border',
                        linkClass: 'btn btn-border',
                        icons: {
                            first: '<<',
                            prev: '<',
                            next: '>',
                            last: '>>',
                        },
                    },
                },
                progress: false,
                queryParams: {
                    search: '',
                    per_page: constants.PER_PAGE,
                },
                searchText: '',
                statusOptions: [
                    {
                        id: constants.STATUS_PROCESS,
                        title: this.$t('translation.process'),
                    },
                    {
                        id: constants.STATUS_CONFIRMED,
                        title: this.$t('translation.confirmed'),
                    },
                    {
                        id: constants.STATUS_DONE,
                        title: this.$t('translation.done'),
                    },
                    {
                        id: constants.STATUS_EXPIRED,
                        title: this.$t('translation.expired'),
                    },
                    {
                        id: constants.STATUS_FAILED,
                        title: this.$t('translation.failed'),
                    }
                ],
                typeOptions: [
                    {
                        id: constants.TYPE_WHOLESALE,
                        title: this.$t('translation.wholesale'),
                    },
                    {
                        id: constants.TYPE_RETAIL,
                        title: this.$t('translation.retail'),
                    },
                ],
                filter: {
                    status: null,
                    type: null,
                }
            };
        },
        methods: {
            onFilterReset() {
                this.searchText = '';
                this.queryParams.search = '';
                this.$nextTick(() => this.$refs.vuetable.refresh());
            },
            onChangePage(page) {
                this.$refs.vuetable.changePage(page);
            },
            onPaginationData(paginationData) {
                this.$refs.pagination.setPaginationData(paginationData);
            },
            edit(data) {
                this.$router.push({ name: 'order.edit', params: { id: data.id }})
            },
            async changeStatus(order_id, status_id) {
                try {
                    await this.$store.dispatch('order/status', {
                        params: {
                            order_id,
                            status_id,
                        }
                    });
                    this.$nextTick(() => this.$refs.vuetable.reload());
                } catch (e) {
                    console.log(e);
                }
            },
            makeTypeFilter(value) {
                this.queryParams.type = value ? value.id : null;
                this.$nextTick(() => this.$refs.vuetable.refresh());
            },
            makeStatusFilter(value) {
                this.queryParams.status = value ? value.id : null;
                this.$nextTick(() => this.$refs.vuetable.refresh());
            },
            tableLoaded() {
                this.progress = false;
            }
        },
        async mounted() {
        },
        watch: {
            searchText: debounce(function (value) {
                this.queryParams.search = value;
                this.$nextTick(() => this.$refs.vuetable.refresh())
            }, constants.DEBOUNCE_INTERVAL),
        },
    };
</script>
