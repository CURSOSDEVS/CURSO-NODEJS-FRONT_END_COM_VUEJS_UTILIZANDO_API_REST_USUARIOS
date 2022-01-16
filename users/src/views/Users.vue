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
                            <button class="button is-danger"  @click="showModalUser(user.id)" >Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--modal da confirmação de deleção-->
        <div :class="{modal:true, 'is-active':showModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <!-- Any other Bulma elements you want -->
                
                <!--Card com as opções de confirmar e cancelar exclusão-->
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                        Você quer realmente deletar o usuário {{this.userid}}?
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                        BLA, BLA BLA
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                        <a href="#" class="card-footer-item" @click="userDelete()">Sim quero apagar este Usuário.</a>
                    </footer>
                </div>

                <!--final do card-->
                
            </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
        </div>
        <!--final do modal-->
        
    </div>    
</template>
<script>
import axios from 'axios';
import config from '../config/Config'
export default {

    data(){
        return{
            users: [],
            showModal : false,
            userid: -1
        }
    },
    
    created(){

       /*  var req = {
            headers: {
            Authorization: "Bearer "+ localStorage.getItem('token')
         }
        }*/

        axios.get(config.hostApi+'user',config.tokenLocalStorage).then(res=>{
            console.log(res.data);
            this.users = res.data;
        }).catch(err=>{
            console.log(err);
        });
    },
    methods:{
        hideModal(){
            this.showModal = false;
        },

        showModalUser(id){
            this.showModal = true;
            this.userid = id;
        },

        userDelete(){
            var req = config.tokenLocalStorage;

            axios.delete(config.hostApi+'user/'+this.userid, req).then(res=>{
                this.showModal = false;
                //Possibilidade de aplicação de filtro
                this.users = this.users.filter(u => u.id != this.userid);
                console.log(res);
                //console.log(this.users)
            }).catch(err=>{
                this.showModal = false;
                console.log(err);
            });

            //consultando o banco de dados e atualizando a relação de usuários
            axios.get(config.hostApi+'user', req).then(res=>{
                console.log(res.data);
            }).catch(error=>{
                console.log(error);
            });

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