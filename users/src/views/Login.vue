<template>
    <div class="content is-medium">
        <div class="columns is-centered">

            <div class="column is-one-third" style="padding-top:60px">

                <div style="width:600px; padding-top:30px" v-if="error !=undefined">
                    <div class="notification is-danger">
                        <p>{{error}}</p>
                    </div>
                </div>

                <div class="box" style="width:600px; padding-top:30px">
                    <h1 class="title is-3" style="padding:10px">Login</h1>
                    <div class="field">
                        <label class="label textLabel">Email</label>
                        <div class="control">
                            <input class="input" type="email" v-model="email" placeholder="email@email.com">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label textLabel">Password</label>
                        <div class="control">
                            <input class="input" type="password" v-model="password" placeholder="********">
                        </div>
                    </div>

                    <button @click="login" class="button is-primary">Sign in</button>
                </div>
            </div>
        </div>
    </div>
   
</template>
<script>
import config from '../config/Config';
import axios from 'axios';
export default {
   data(){
       return{
           email: '',
           password: '',
           error: undefined
       }
   },
   methods:{
       login(){
           axios.post(config.hostApi+'login',{
               email: this.email,
               password: this.password
           }).then(res=>{
               console.log(res);
               localStorage.setItem('token',res.data.tokenJwt);
               this.$router.push({name: 'Users'});
           }).catch(err=>{
               
               this.error = err.response.data.err;
           })
       }

   }
   
}
</script>
<style>
    .textLabel{        
        text-align: left;
    }
</style>