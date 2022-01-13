<template>
    <div >
        <div>
            <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">

                <div class="navbar-start">
                    <a class="navbar-item">Home</a>                   
                    <a class="navbar-item">Documentation</a>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">Usuários</a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item" >Listar Usuário</a>
                            <a class="navbar-item">Listar</a>
                            <a class="navbar-item">Editar</a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">Sair</a>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary"><strong>Sign up</strong></a>
                            <a class="button is-light">Log in</a>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
        <hr>
        <h1 class="title is-3">
            Painel Administrativo
        </h1>
        <hr>
        </div>

        <div class="column is-centered is-offset-one-quarter">
            <table class="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>role</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="user in users" :key="user.id">
                        <th>{{user.id}}</th>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.role | processRole}}</td>
                        <td>
                            <button class="button is-primary">Editar</button>
                            <button class="button is-danger">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--modal da confirmação de deleção
        
        -->
        
    </div>    
</template>
<script>
import axios from 'axios';
import config from '../config/Config'
export default {

    data(){
        return{
            users: [],
            userid: -1
        }
    },
    
    created(){

         var req = {
            headers: {
            Authorization: "Bearer "+ localStorage.getItem('token')
         }
        }

        axios.get(config.hostApi+'user',req).then(res=>{
            console.log(res.data)
            this.users = res.data;
        }).catch(err=>{
            console.log(err);
        });
    },
    methods:{
        delete(){
            console.log(this.userid)
        }
    },
    //essa propriedade possibilita a criação de filtros que serão utilizados no interface com o usuário
    filters:{
        processRole: function(value){
            if(value == 0){
                return "Usuário comum"
            }else if(value == 1){
                return "Admin"
            }
        }
    }
}
</script>
<style scoped>

</style>