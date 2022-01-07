<template>
    <div class="content is-medium"> 
        <h1 style="padding-top:40px">Registro de Usuário</h1>
                <hr>       
        <div class="columns is-centered">
          
                
                <div class="column is-one-third">

                    <div v-if="error !=undefined">
                        <div class="notification is-danger">
                            <p>{{error}}</p>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label" style="text-align:left">Nome</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-success" type="text" placeholder="Nome do usuário" v-model="name">
                            <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label" style="text-align:left">Email</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-danger" type="email" placeholder="Email do usuário" v-model="email">
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>

                    </div>

                    <div class="field">
                        <label class="label" style="text-align:left">Password</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-danger" type="password" placeholder="******" v-model="password">
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>
                    </div>

                    <div class="field">
                        <p class="control">
                            <button class="button is-success is-medium is-fullwidth" @click="register">
                                Login
                            </button>
                        </p>
                    </div>  

                </div> 
             
        </div>   
    </div>    
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            name:'',
            password:'',
            email: '',
            error: undefined
        }  
    },
    methods:{
        register(){
            axios.post('http://localhost:8686/user',{
                name: this.name,
                password: this.password,
                email: this.email
            }).then(res =>{
                console.log(res);
                this.$router.push({name: 'SucessRegister'});
            }).catch(err=>{
                var errMens = err.response.data.err;
                this.error = errMens;
            });
        }
    }


    
}
</script>
<style>

</style>