<template>
    <span v-if="Remark">
    　　{{Remark}}
    </span>
    <span v-else>
        --
    </span>
</template>
<script>
export default {
    props: ['Remark']
}
</script>