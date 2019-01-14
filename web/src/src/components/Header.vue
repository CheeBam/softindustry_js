<template>
    <div class="container">
        <nav class="mt-1 mb-3">
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <router-link :to="{ name: 'home' }" tag="a" class="nav-item nav-link" role="tab" exact>
                    {{ $t("translation.homepage") }}
                </router-link>
                <router-link :to="{ name: 'order.create' }" tag="a" class="nav-item nav-link" role="tab" exact>
                    {{ $t("translation.create") }}
                </router-link>
                <router-link :to="{ name: 'order.list' }" tag="a" class="nav-item nav-link" role="tab" exact>
                    {{ $t("translation.list") }}
                </router-link>
                <router-link :to="{ name: 'order.download' }" tag="a" class="nav-item nav-link" role="tab" exact>
                    {{ $t("translation.importOrders") }}
                </router-link>
                <div class="ml-auto nav">
                    <template v-if="authLogged">
                        <a href="#" class="nav-link" @click.prevent="logout">
                            {{ $t("translation.logout") }}
                        </a>
                        <router-link :to="{ name: 'auth.profile' }" tag="a" class="nav-link" exact>
                            {{ $t("translation.profile") }}
                        </router-link>
                    </template>
                    <template v-else>
                        <router-link :to="{ name: 'auth.register' }" tag="a" class="nav-link" exact>
                            {{ $t("translation.register") }}
                        </router-link>
                        <router-link :to="{ name: 'auth.login' }" tag="a" class="nav-link" exact>
                            {{ $t("translation.login") }}
                        </router-link>
                    </template>
                </div>
            </div>
        </nav>
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import authMixin from '../mixins/auth';

    export default {
        mixins: [
            authMixin,
        ],
    };
</script>
