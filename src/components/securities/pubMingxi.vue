<template>
    <div>
        <selfModel
            :visible="visible"
            width="500"
            title="明细"
            @close="closeModel"
        >
            <div class="yuequanModel" slot="modelContent">
                <div class="list">
                    <p v-for="(item, key) in detailData" :key="key">{{key}}<span>{{ item }}</span></p>
                    <!-- <p v-for="key in listKey" :key="key">{{key}}<span>{{ detailData[key] }}</span></p> -->
                </div>
            </div>
        </selfModel>
        
    </div>
</template>

<script>

import selfModel from "@/components/selfModel/selfModel.vue";
export default {
    components: {
        selfModel,
    },
    props: {
        loading: {},
        detailData: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            visible: false,
            listKey: [
                ''
            ]
        };
    },
    methods: {
        showModel() {
            this.visible = true;
        },
        closeModel() {
            this.visible = false;
        },
    },
};
</script>
<style scoped>
.pd30 {
    padding: 30px;
}
.submitBox {
    padding: 30px 0 0;
    border-top: 1px solid #eee;
}
.submit_btn {
    display: block;
    margin: 0 auto;
    width: 150px;
    height: 54px;
    background: #c5181f;
    border-radius: 5px;
    font-size: 18px;
    color: #ffffff;
}
.list{
    padding-bottom: 5px;
}
.list p{
    display: flex;
    justify-content: space-between;
    line-height: 2em;
    margin-bottom: 8px;
    color: #666;
}
.list p span{color: #333;}
</style>

