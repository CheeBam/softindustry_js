export default {
    data() {
        return {
            validationRules: {
                name: {
                    rules: {
                        required: true,
                        max: 255,
                    },
                },
                phone: {
                    rules: {
                        required: true,
                        regex: /^((\+38)?0([0-9]){9})$/,
                    },
                },
                email: {
                    rules: {
                        required: true,
                        email: true,
                        max: 255,
                    },
                },
            },
        };
    },
};
