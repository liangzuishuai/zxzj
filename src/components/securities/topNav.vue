<template>
    <div>
        <div class="topnavBox">
            <div v-if="$route.name!='extension'&&$route.name!='return'"  class="leftNav" >
                <ul>
                    <li v-for="(item,index) in navList" :class="index==current?'current':''" @click="changeNav(index)">{{item}}</li>
                </ul>
            </div>
            <div  v-else class="zhanNav" @click="backTo">
               <i class="el-icon-arrow-left"></i><span class="back">返回上一页</span>
            </div>
            <div  v-if="$route.name=='extension'||$route.name=='return'" class="modelTitle"><i class="line_l"></i><span>{{title}}</span><i class="line_r"></i></div>
            <div class="accountList">
                <span>信用账户</span>
                <el-select v-model="value" style="width:260px" @change="accountChange" size="small">
                    <el-option
                    v-for="item in fundAccountList"
                    :key="item[1]"
                    :label="item[0] + '   ' + item[1]"
                    :value="item[1]">
                        <span style="float: left; color: #8492a6; font-size: 13px">{{ item[0] }}</span>
                        <span style="float: right">{{ item[1]}}</span>
                    </el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
    inject: ['reload'],
    props:['navList','current','title'],
    data () {
        return {
            value:'',
            fundAccountList: ''
        }
    },
    created(){
        this.value = this.fundAccount
    },
    computed:{
        ...mapState(['fundAccount','fundNames']),
    },
    watch: {
        fundNames: {
            handler (newFundNames, oldName) {
                const fundAccountList = [
                    // ['GALAXY_INT_AM3', '8009205802']
                ]
                
                newFundNames.split(';').forEach(fundAccount => {
                    fundAccountList.push(fundAccount.split('|'))
                });

                this.fundAccountList = fundAccountList
            },
            immediate: true
        }
    },
    methods: {
        ...mapMutations(['SET_ACCOUNT']),
        accountChange(e){
            this.SET_ACCOUNT(e)
            this.value = e;
            this.reload()
        },
        changeNav(index){
            this.$emit('change',index);
        },
        backTo(){
            this.$router.go(-1);
        },
    },
    
}
</script>

<style scoped lang="scss">
    .topnavBox{
        display: flex;
        justify-content: space-between;
        height: 50px;
        align-items: center;
    }
    .leftNav ul{
        display: flex;
            li{
                cursor: pointer;
                height: 50px;
                line-height: 50px;
                min-width: 130px;
                padding: 0 15px;
                box-sizing: border-box;
                text-align: center;
                margin-right: 10px;
                background: #F0F2F7;
                color: #666;
                font-size: 16px;
                position: relative
            }
            .current{
                color: #C5181F;
                background: #fff;
            }
            .current:before{
                content:'';
                width: 100%;
                height: 4px;
                background: #C5181F;
                position: absolute;
                left: 0;
                top: 0;
            }
    }
    .accountList{
        display: flex;
        align-items: center;
    }
    .accountList>span{margin-right: 10px;}
    .modelTitle{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36px;
        color: #1c1d1c;
        font-weight: bold;
        box-sizing: border-box;
    }
    .modelTitle span{
        margin: 0 20px;
    }
    .modelTitle i{
        width: 60px;
        height: 2px;
        position: relative;
    }
    .line_l{background: linear-gradient(270deg, #c5181f 0%, rgba(197, 24, 31, 0) 100%);}
    .line_r{background: linear-gradient(55deg, #c5181f 0%, rgba(197, 24, 31, 0) 100%);}
    .modelTitle i::after {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        background: #c5181f;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        margin-top: -3px;
    }
    .modelTitle i.line_l::after{
        right: -3px;
    }
    .modelTitle i.line_r::after{
        left: -3px;
    }
    .back{
        color: #666666;
    }
    .zhanNav{cursor: pointer;}
</style>
