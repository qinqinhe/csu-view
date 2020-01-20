const minxin = {
    data() {
        return {
            misfirePolicy: [
                {
                    value: '1',
                    label: '立即执行',
                },
                {
                    value: '2',
                    label: '执行一次',
                },
                {
                    value: '3',
                    label: '放弃执行',
                },
            ],
            concurrent: [
                {
                    value: '0',
                    label: '允许',
                },
                {
                    value: '1',
                    label: '禁止',
                    type: 'danger',
                },
            ],
            status: [
                {
                    value: '1',
                    label: '正常',
                },
                {
                    value: '0',
                    label: '暂停',
                    type: 'danger',
                },
            ],
        }
    },
    methods: {
        getMisfirePolicy(misfirePolicy) {
            for (let item of this.misfirePolicy) {
                if (item.value === misfirePolicy) {
                    return item;
                }
            }
            return null;
        },
        getConcurrent(concurrent) {
            for (let item of this.concurrent) {
                if (item.value === concurrent) {
                    return item;
                }
            }
            return null;
        },
        getStatus(status) {
            for (let item of this.status) {
                if (item.value === status) {
                    return item;
                }
            }
            return null;
        }
    }
}

export default [minxin]