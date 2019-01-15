<template>
    <div>
        <div class="col-12">
            <form @submit.prevent="save">
                <div v-if="progress" class="loading"></div>
                <div class="card">
                    <div class="card-header">
                        {{ $t("translation.customer") }}
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label for="email">
                                        {{ $t("translation.email") }}
                                    </label>
                                    <input
                                            id="email"
                                            v-model="orderCustomerEmail"
                                            type="email"
                                            :class="[errors.has('email') ? 'is-invalid' : '', 'form-control']"
                                            name="email"
                                            v-validate="validationRules.email"
                                            data-vv-validate-on="none"
                                            autofocus
                                    >
                                    <div v-show="errors.has('email')" class="invalid-feedback">
                                        {{ errors.first('email') }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="name">
                                        {{ $t("translation.name") }}
                                    </label>
                                    <input
                                            id="name"
                                            v-model="orderCustomerName"
                                            type="text"
                                            :class="[errors.has('name') ? 'is-invalid' : '', 'form-control']"
                                            name="name"
                                            v-validate="validationRules.name"
                                            data-vv-validate-on="none"
                                    >
                                    <div v-show="errors.has('name')" class="invalid-feedback">
                                        {{ errors.first('name') }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="surname">
                                        {{ $t("translation.surname") }}
                                    </label>
                                    <input
                                            id="surname"
                                            v-model="orderCustomerSurname"
                                            type="text"
                                            :class="[errors.has('surname') ? 'is-invalid' : '', 'form-control']"
                                            name="surname"
                                            v-validate="validationRules.name"
                                            data-vv-validate-on="none"
                                    >
                                    <div v-show="errors.has('surname')" class="invalid-feedback">
                                        {{ errors.first('surname') }}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="phone">
                                        {{ $t("translation.phone") }} <i class="text-secondary"><small>(Ukraine numbers. Ex: +380xxxxxxxxx/0xxxxxxxxx)</small></i>
                                    </label>
                                    <input
                                            id="phone"
                                            v-model="orderCustomerPhone"
                                            type="text"
                                            :class="[errors.has('phone') ? 'is-invalid' : '', 'form-control']"
                                            name="phone"
                                            v-validate="validationRules.phone"
                                            data-vv-validate-on="none"
                                    >
                                    <div v-show="errors.has('phone')" class="invalid-feedback">
                                        {{ errors.first('phone') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-3 mb-3">
                    <div class="card-header">
                        {{ $t("translation.customer") }}
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label>
                                        {{ $t("translation.provider") }}
                                    </label>
                                    <multiselect v-model="orderProvider"
                                                 :options="authProviders"
                                                 label="company"
                                                 track-by="id"
                                                 :multiple="false"
                                                 :select-label="$t('translation.selectProvider')"
                                                 :placeholder="$t('translation.selectProvider')"
                                                 :allow-empty="true"
                                                 :class="{ 'border border-danger rounded': errors.has('provider') }"
                                                 data-vv-name="provider"
                                                 data-vv-validate-on="none"
                                                 v-validate="'required'"
                                                 @select="getPositions"
                                    >
                                    </multiselect>
                                    <small class="invalid-feedback"
                                           v-show="errors.has('provider')"
                                           style="display: block !important;">
                                        {{ errors.first('provider') }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label>
                                        {{ $t("translation.position") }}
                                    </label>
                                    <multiselect v-model="orderPosition"
                                                 :options="positionList"
                                                 label="title"
                                                 track-by="id"
                                                 :multiple="false"
                                                 :select-label="$t('translation.selectPosition')"
                                                 :placeholder="$t('translation.selectPosition')"
                                                 :allow-empty="false"
                                                 :class="{ 'border border-danger rounded': errors.has('position') }"
                                                 data-vv-name="position"
                                                 data-vv-validate-on="none"
                                                 v-validate="'required'"
                                    >
                                    </multiselect>
                                    <small class="invalid-feedback"
                                           v-show="errors.has('position')"
                                           style="display: block !important;">
                                        {{ errors.first('position') }}
                                    </small>
                                </div>
                                <div v-if="authLogged" class="mb-3">
                                    <router-link tag="a" :to="{ name: 'position.create' }">
                                        {{ $t("translation.addNewPosition") }}
                                    </router-link>
                                </div>
                                <div class="form-group">
                                    <label>
                                        {{ $t("translation.type") }}
                                    </label>
                                    <multiselect v-model="orderType"
                                                 :options="types"
                                                 label="title"
                                                 track-by="id"
                                                 :disabled="isEditPage"
                                                 :multiple="false"
                                                 :select-label="$t('translation.selectType')"
                                                 :placeholder="$t('translation.selectType')"
                                                 :allow-empty="false"
                                                 :class="{ 'border border-danger rounded': errors.has('type') }"
                                                 data-vv-name="type"
                                                 data-vv-validate-on="none"
                                                 v-validate="'required'"
                                    >
                                    </multiselect>
                                    <small class="invalid-feedback"
                                           v-show="errors.has('type')"
                                           style="display: block !important;">
                                        {{ errors.first('type') }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="sys-id">
                                        {{ $t("translation.sysID") }}
                                        <span class="tooltip">{{ $t("translation.note") }}!
                                            <span class="tooltiptext">{{ $t("translation.noteText") }}</span>
                                        </span>
                                    </label>
                                    <input
                                            id="sys-id"
                                            readonly
                                            v-model="sysId"
                                            type="text"
                                            class="form-control"
                                            name="sys-id"
                                    >
                                </div>
                                <div class="form-group">
                                    <label for="sys-id">
                                        {{ $t("translation.dueDate") }}
                                    </label>
                                    <date-time-picker
                                                    v-model="orderDueDate"
                                                    main-button-class="form-control"
                                                    :time-picker="false"
                                                    format="dd-LL-yyyy"
                                                    :disabled="isEditPage"
                                    >
                                    </date-time-picker>
                                </div>
                                <div class="form-group">
                                    <label for="phone">
                                        {{ $t("translation.comment") }}
                                    </label>
                                    <textarea
                                            id="comment"
                                            v-model="orderComment"
                                            type="text"
                                            class="form-control"
                                            name="comment"
                                    >
                                    </textarea>

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
    import Multiselect from 'vue-multiselect';
    import DateTimePicker from 'vue-vanilla-datetime-picker';
    import authMixin from '../../mixins/auth';
    import orderMixin from '../../mixins/order';
    import positionMixin from '../../mixins/position';
    import validationMixin from '../../mixins/validation';
    import { DateTime } from 'luxon';
    import * as constants from '../../utils/constants';

    export default {
        components: {
            Multiselect,
            DateTimePicker,
        },
        mixins: [
            authMixin,
            orderMixin,
            positionMixin,
            validationMixin,
        ],
        metaInfo() {
            return {
                title: this.isEditPage ? this.$t('translation.updateOrder') : this.$t('translation.createOrder'),
            };
        },
        data() {
            return {
                constants,
                progress: false,
                types: [
                    {
                        id: constants.TYPE_WHOLESALE,
                        title: this.$t('translation.wholesale'),
                    },
                    {
                        id: constants.TYPE_RETAIL,
                        title: this.$t('translation.retail')
                    }
                ],
            };
        },
        async mounted() {
            this.$store.dispatch('auth/providers');

            if (this.isEditPage) {
                try {
                    this.progress = true;
                    await this.$store.dispatch('order/show', this.$route.params.id);
                    this.getPositions(this.orderProvider, true);
                    this.progress = false;
                } catch (e) {
                    console.error(e);
                    this.progress = false;
                }
            } else {
                this.orderDueDate = DateTime.local();
            }
        },
        computed: {
            isEditPage() {
                return this.$route.name === 'order.edit';
            },
            sysId() {
                if (!this.isEditPage) {
                    return this.orderType
                        ? `${this.orderType.id === constants.TYPE_RETAIL
                            ? 'p'
                            : 'o'
                            }-${DateTime.local().toFormat('yyMMdd')}__`
                        : '';
                }
                return this.orderSysId;
            },
        },
        methods: {
            async save() {
                const valid = await this.$validator.validateAll();

                if (valid) {
                    this.progress = true;

                    let params = {
                        sys_id: this.sysId,
                        customer: {
                            email: this.orderCustomerEmail,
                            name: this.orderCustomerName,
                            surname: this.orderCustomerSurname,
                            phone: this.orderCustomerPhone,
                        },
                        position_id: this.orderPosition.id,
                        comment: this.orderComment,
                    };

                    if (!this.isEditPage) {
                        params = {
                            ...params,
                            order_type_id: this.orderType.id,
                            due_date: this.orderDueDate,
                        };
                    }

                    const data = this.isEditPage ? { id: this.$route.params.id, params } : { params };

                    try {
                        await this.$store.dispatch(`order/${this.isEditPage ? 'update' : 'store'}`, data);

                        this.progress = false;
                        this.$router.push({ name: 'order.list' });
                    } catch (e) {
                        this.progress = false;
                    }
                }
            },
            getPositions(provider, keep = false) {
                if (!keep) this.orderPosition = null;
                this.$store.dispatch('position/index', { user_id: provider.id});
            },
        },
        beforeDestroy() {
            this.$store.dispatch('order/clear');
        }
    };
</script>

