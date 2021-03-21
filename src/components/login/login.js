import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios';
import {url} from '../../setUrl'
import gatiLogo from '../../Assets/gatimeow.png'
import '../../App.css'
import google from '../../Assets/google_signin_buttons/android/hdpi/btn_google_signin_light_normal_hdpi.9.png'

const Login = ({setTab}) => {

    const successLogin = (res) =>{
        const {profileObj, tokenId} = res;
        console.log(res);
        let dir = url.localhost + '/login'
        axios.post(dir, {
            method: 'POST',
            data: profileObj,
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorize': tokenId},
            credentials: 'include',
            mode: 'cors'
        })
        .then((srvRes)=>{
            if(srvRes.status === 200){
                localStorage.setItem('SESSION', JSON.stringify(res))
                setTab(false);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const failedLogin = (res) =>{
        console.log(res.error);
    }

    return ( 
        <div style={{justifyContent: 'center', textAlign: 'center', color: '#f3a2a2'}}>
            <div className='login-box-shadow' style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white'}}>
                <img src={gatiLogo} alt='logo'/>
                <h1 style={{marginTop: '0px'}}>¡Gatimeow!</h1>
                <div style={{display: 'flex', justifyContent: 'center', borderRadius: '20px', width: '100%'}}>
                    <GoogleLogin
                    clientId="140075970753-g87nv52olq7lucv6mt9fbflgr173ql0s.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={successLogin}
                    onFailure={failedLogin}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='google-button'><img src={google} alt='google'></img><span class='span'>Sign in with google</span></button>
                    )}
                    />
                </div>
            </div>
        </div>
     );
}
 
export default Login;