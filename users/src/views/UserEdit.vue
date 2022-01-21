<template>
    <div class="content is-medium"> 
        <h1 style="padding-top:40px">Edição de Usuário</h1>
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
                            <input class="input is-success" type="email" placeholder="Email do usuário" v-model="email">
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>

                    </div>


                    <div class="field">
                        <p class="control">
                            <button class="button is-success is-medium is-fullwidth" @click="update">
                                Salvar
                            </button>
                        </p>
                    </div>  

                </div> 
             
        </div>   
    </div>    
</template>

<script>
import axios from 'axios';
import config from '../config/Config'
export default {
    data(){
        return{
            name:'',
            email: '',
            id: -1,
            error: undefined
        }  
    },

    created(){

        //pegando o id do usuário passadi oeka requisição
        var userId = this.$route.params.id;

        //verificando se o id passado pelo usuário é valido
         axios.get(config.hostApi+'user/'+ userId, config.tokenLocalStorage).then(res => {
           // console.log("resultado"+res);

            //pegando os valores que foram buscados no banco de dados pelo axios
            this.name = res.data.user.name;
            this.email = res.data.user.email;
            this.id = res.data.user.id;
          //  console.log(this.name+this.id+this.email);

        }).catch(err=>{
            console.log(err.response);
            //caso não encontre o usuário, o cliente será redirecionado para a página home
            this.$router.push({name: 'Users'});
        })

        

    },

    methods:{
        update(){

            axios.put(config.hostApi+'user',{
                id: this.id,
                name: this.name,
                email: this.email
            }, config.tokenLocalStorage).then(res =>{
                console.log(res);
                this.$router.push({name: 'Users'});
            }).catch(err=>{
                var errMens = err.response.data;
                console.log("erro ao editar o usuário: "+ errMens);
                this.error = errMens;
            })
        }
    }


    
}
</script>
<style>

</style>