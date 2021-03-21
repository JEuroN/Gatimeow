import React, {useState, useEffect} from 'react'
import Random from './Random'
import Search from './Search'
import axios from 'axios';
import '../../App.css'
import logoutIcon from '../../Assets/logout.png'

const Dash = ({setTab}) => {

    const [view, setView] = useState(1);

    const [gatos, setGatos] = useState([]);

    const [amount, setAmount] = useState(0);
    
    const [name, setName] = useState(0);

    const filter = (array, catAmount) => {
        let newArray = array.filter((catPic, index)=>{
            return index >= catAmount && index < catAmount+30;
        })
        return newArray;
    }

    const [album, setAlbum] = useState([...filter(gatos)]);
    
    const handleAmount = (MoreOrLess) => {
        if(MoreOrLess) {
            if(gatos.length - amount !== 0)
            setAmount(amount+30);
            if(gatos.length - amount <= 30)
                searchGato();
        }else if(amount > 0){
            setAmount(amount-30);
        }
    }

    const searchGato = () => {
        axios.get('https://api.thecatapi.com/v1/images/search?limit=90&api_key=8fab3387-2c85-41e2-9677-148f9debde90', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            credentials: 'include',
            mode: 'cors'
    })
    .then((r)=>{
        console.log(r);
        setGatos([...gatos, ...r.data]);
    })
    .catch((r)=>{
        console.log(r);
    })
    }

    useEffect(() => {
        let username = JSON.parse(localStorage.getItem('SESSION'));
        setName(username.givenName);
        searchGato();
    }, [])

    useEffect(()=>{
        setAlbum([...filter(gatos, amount)]);
    }, [amount, gatos])

    const logout = () => {
        localStorage.removeItem('SESSION');
        setTab(true);
    }

    const handleChangeView = (view) => {
        if(view===1)
            searchGato();
        setAmount(0);
        setView(view);
    }

    return ( 
        <div className='dash-container'>
            <header className='header' style={{width: '100%'}}>
                <div style={{flex: '1' , display: 'flex', justifyContent: 'left'}}>
                    <button className={view === 1 ? 'active tab-button' : 'tab-button'} onClick={()=>{handleChangeView(1)}}>Random kitties</button>
                    <button className={view === 2 ? 'active tab-button' : 'tab-button'} onClick={()=>{handleChangeView(2)}}>Search kitties</button>
                </div>
                <div className ='right-header' style={{flex: '1', display: 'flex', justifyContent: 'flex-end'}}>
                    <span className='logo'>Welcome <span className='logo name'>{name}</span>, miau!</span>
                    <button className='logout tab-button' onClick={()=>{logout(true)}}><img src={logoutIcon} alt='logout'></img></button>
                </div>
            </header>
            {view === 1 ? (<Random gatos={gatos} album={album} handleAmount={handleAmount} />) : null}
            {view === 2 ? (<Search filter={filter} />) : null}
        </div>
     );
}
 
export default Dash;