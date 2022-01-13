<template>

  
</template>
<script>
import axios from 'axios';
import config from '../../config/Config';
export default {
    data(){
        return{
            users : {}
        }
    },
    created(){
        axios.get(config.hostApi+'user').then(res=>{
                  
        }).catch(err=>{
            console.log(err);
        });
    },
    methods:{

    }
}
</script>