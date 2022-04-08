<template>
    <div>
        <span v-if="FareWay == '3'">是</span>
        <span v-else>否</span>
    </div>
</template>
<script>
export default {
    props: ['FareWay']
}
</script>