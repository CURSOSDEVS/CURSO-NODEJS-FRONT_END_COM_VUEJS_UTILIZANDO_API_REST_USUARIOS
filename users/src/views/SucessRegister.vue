<template>
    <div>
        <h1 class="title is-3" style="padding-top:100px">Usuário cadastrado com sucesso !</h1>
        <button @click="home" class="button is-link is-light">voltar para Home</button>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        home(){
            this.$router.push({name: 'Home'});
        }
    }
}
</script>
<style>

</style>