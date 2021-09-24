<template>
    <div class='home'>
      我是首页
      <button @click="tuichu">退出</button>
    </div>
</template>

<script>
export default {
    
    components: {},
    data() {
        
        return {
            
        };
    },
    computed: {},
    watch: {},
    
    methods: {
        tuichu(){
            window.sessionStorage.clear()
            this.$router.push("/login")
        }
    },
    created() {
        
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
    
</style>