<!-- 融券业务外层框架 -->
<template>
    <div class="pub_layouts">
        <Header :curIndex="2"/>
        <div class="pubContent business_box">
            <div class="bus_header f_d_a_i">
                <img class="bus_bjimg" src="@/assets/bj_img4.png" alt />
                <div class="bus_card j_c_a_i">
                    <div
                        v-for="(item, index) in titleData"
                        :key="index + 'a'"
                        :class="['card_item', $route.meta.pname == item.name ? 'curred' : '', 'j_c_a_i']"
                        @click="navChange(index)"
                    >
                        <img v-if="$route.meta.pname == item.name" :src="item.imgcur" alt />
                        <img v-else :src="item.img" alt />
                        <div class="card_right">
                            <p class="p1">{{ item.title }}</p>
                            <p class="p2">{{ item.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="securitiesContent">
                <router-view v-if="isRouterAlive"></router-view>
            </div>
            
        </div>
        <Footer/>
        <SIdenavigation></SIdenavigation>
    </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import SIdenavigation from '@/components/securities/SIdenavigation.vue';
export default {
    provide() {
        //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
        return {
            reload: this.reload,
        };
    },
    components: {
        Footer,
        Header,
        SIdenavigation
    },
    data() {
        return {
            isRouterAlive: true, //控制视图是否显示的变量
            titleData: [
                {
                    img: require('@/assets/securities/icon1_1.png'),
                    imgcur: require('@/assets/securities/icon1.png'),
                    title: '券池',
                    text: 'Inventory',
                    name:'couponPool',
                },
                {
                    img: require('@/assets/securities/icon2_1.png'),
                    imgcur: require('@/assets/securities/icon2.png'),
                    title: '新约',
                    text: 'Borrow',
                    name:'entrustBorrow',
                },
                {
                    img: require('@/assets/securities/icon3_1.png'),
                    imgcur: require('@/assets/securities/icon3.png'),
                    title: '存续',
                    text: 'Contract',
                    name:'contract'
                },
                {
                    img: require('@/assets/securities/icon4_1.png'),
                    imgcur: require('@/assets/securities/icon4.png'),
                    title: '查询',
                    text: 'Inquiry',
                    name:'inquiry'
                }
            ], 
            
        }
    },
    beforeCreate(){
        if(this.$store.state.token&&this.$store.state.fundAccount&&this.$store.state.showcoupon==1){}else{
            this.$router.push('/index')
        }
    },
    created() {
    },
    methods: {
        navChange(index){
            this.$router.push({name:this.titleData[index].name});
        },
        reload() {
            this.isRouterAlive = false; //先关闭，
            this.$nextTick(function() {
                this.isRouterAlive = true; //再打开
            });
        },
    },
    
};
</script>
<style>
    @import "~@/assets/css/securities.css";
</style>
<style scoped lang="scss">
    .pubContent{
        width: 100%;
        min-width: 1280px;
        margin: 0 auto;
        overflow-x: auto;
        min-height: calc(100vh - 140px);
        padding-bottom: 50px;
        box-sizing: border-box;
    }
    .business_box {
        width: 100%;
        background: #f8f9fc;

        .bus_header {
            position: relative;
            width: 100%;
            overflow: hidden;
            padding: 0 0 65px 0;

            .bus_bjimg {
                width: 100%;
                height: 400px;
                object-fit: cover;
            }

            .bus_card {
                position: absolute;
                bottom: 0;
                width: 1400px;
                height: 130px;
                left: 50%;
                transform: translateX(-50%);
                justify-content: space-between;

                .card_item {
                    cursor: pointer;
                    padding: 0 50px;
                    width: 23.92%;
                    height: 130px;
                    justify-content: flex-start;
                    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
                    background-position: center;
                    background-repeat: no-repeat;
                    border-radius: 10px;
                    background-image: url("~@/assets/securities/bj_img2.png");
                    background-size: 100% 100%;
                    box-sizing: border-box;
                    & img {
                        width: 70px;
                        height: 70px;
                        margin-right: 20px;
                    }

                    .card_right {
                        color: #1c1d1c;

                        & .p1 {
                            font-weight: 500;
                            color: #1c1d1c;
                            font-size: 20px;
                        }

                        & .p2 {
                            font-weight: 500;
                            font-size: 20px;
                            color: rgba(204, 204, 204, 0.5);
                            text-transform: uppercase;
                        }
                    }
                }

                .curred {
                    background-image: url("~@/assets/securities/bj_img1.png");
                    & .p1 {
                        color: #ffffff !important;
                    }

                    & .p2 {
                        color: rgba(255, 255, 255, 0.5) !important;
                    }
                }
            }
        }
    }
    .securitiesContent{
        max-width: 1440px;
        margin: 0 auto;
        padding: 100px 20px 0;
        min-width: 1280px;
        box-sizing: border-box;
    }
    @media screen and (max-width:1440px) {
        .business_box .bus_header .bus_card{
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
        }
    }
</style>


