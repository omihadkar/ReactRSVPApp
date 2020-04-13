import axios from 'axios'

function setToken(token) {
    if(token)
    {
        axios.defaults.headers.common['auth-token']=token;
    }
    else
    {
        delete axios.defaults.headers.common['auth-token'];
    }
}

export default setToken
