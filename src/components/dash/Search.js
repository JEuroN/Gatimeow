import React, {useState, useEffect} from 'react';
import Dropdown from '../options/dropdown'
import Cards from '../options/cards'
import {url} from '../../setUrl'
import axios from 'axios';
import CategoryDrop from '../options/categoryDrop'
import '../../App.css'
import left_arrow from '../../Assets/left-arrow.png'
import right_arrow from '../../Assets/right-arrow.png'

const Search = ({filter}) => {

    const [search, setSearch] = useState({param: 'No selected', opt: 0, filter: 'No selected'})

    const [newAlbum, setNewAlbum] = useState([]);

    const [gatos, setGatos] = useState([]);

    const [breeds, setBreeds] = useState([{name: '', id: ''}]);

    const [categories, setCategories] = useState([{name: '', id: ''}]);

    const [amount, setAmount] = useState(0);

    const [searching, setSearching] = useState(false);

    const handleAmount = (MoreOrLess) => {
        if(MoreOrLess) {
            console.log(gatos.length - (amount+4))
            if(gatos.length - (amount+4) > 0)
                setAmount(amount+4);
        }else if(amount > 0){
            setAmount(amount-4);
        }
    }


    useEffect(()=>{
        setNewAlbum([...filter(gatos, amount)]);
    }, [amount, gatos])

    const searchGato = (method) => {
        setSearching(true);
        let obj = {...search};
        if(obj.opt === 1 || obj.opt === 0 || obj.filter === 'No selected'){
            console.log('No se ha seleccionado nada')
        }else{
            axios.post(url.localhost + '/getGatos', {
                method: 'POST',
                data: obj,
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                credentials: 'include',
                mode: 'cors'
            })
            .then((r)=>{
                console.log(r);
                setAmount(0);
                setGatos([...r.data.msg])
            })
            .catch((r)=>{
                console.log(r);
            })
        }
    }

    useEffect(()=>{
        const getCategories = axios.get(url.categories)
        const getBreeds = axios.get(url.breeds)
        axios.all([getCategories, getBreeds])
        .then(axios.spread((...res)=>{
            setCategories([...res[0].data]);
            setBreeds([...res[1].data]);
        }))
        .catch((r)=>{
            console.log(r);
        })
    }, [])

    return ( 
    <div>
        <div className='centered'>
            <span style={{alignSelf: 'center'}}>¿Are you looking for a specific cat?</span>
            <div className='search-box'>
                <Dropdown search={search} setSearch={setSearch} options={{breeds: breeds, categories: categories}}/>
                <CategoryDrop search={search} setSearch={setSearch} options={{breeds: breeds, categories: categories}} />
                <button className='setButton' style={{borderTopRadius: '20px'}} onClick={()=>{searchGato(search)}}>Search kitties</button>
            </div>
        </div>
            {searching ? (<Cards gatos={newAlbum}/>) : null }
        <footer className='footer'>
                <button onClick={()=>{handleAmount(false)}}><img src={left_arrow} alt='left'></img></button>
                <span> I want more kitties</span>
                <button onClick={()=>{handleAmount(true)}}><img src={right_arrow} alt='right'></img></button>
        </footer>
    </div> 
    );
}
 
export default Search;