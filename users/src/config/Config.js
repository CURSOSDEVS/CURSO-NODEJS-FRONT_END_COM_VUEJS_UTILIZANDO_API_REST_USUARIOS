module.exports = {
   hostApi: 'http://localhost:8686/',
    
    tokenLocalStorage:{
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem('token')
        }
    }
}