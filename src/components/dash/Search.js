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
            if(gatos.length - amount !== 0)
            setAmount(amount+30);
            if(gatos.length - amount <= 30)
                searchGato();
        }else if(amount > 0){
            setAmount(amount-30);
        }
    }


    useEffect(()=>{
        setNewAlbum([...filter(gatos, amount)]);
    }, [amount, gatos])

    const searchGato = async () => {
        setSearching(true);
        let obj = {...search};
        let result;
        if(obj.opt === 1 || obj.opt === 0 || obj.filter === 'No selected'){
            console.log('No se ha seleccionado nada')
        }else if(obj.opt === 2){
            result = await searchGatosByBreed(obj.filter)
            setAmount(0);
            setGatos([...result])
        }else{
            result = await searchGatosByCategory(obj.filter)
            setAmount(0)
            setGatos([...result])
        }
    }

    const searchGatosByBreed = async (breed) => {
        return await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&limit=90&api_key=8fab3387-2c85-41e2-9677-148f9debde90`)
        .then((r)=>{
            return r.data;
        })
        .catch((r)=>{
            return false;
        })
    }
    
    const searchGatosByCategory = async (category) => {
        return await axios.get(`https://api.thecatapi.com/v1/images/search?category_ids=${category}&limit=90&api_key=8fab3387-2c85-41e2-9677-148f9debde90`)
        .then((r)=>{
            return r.data;
        })
        .catch((r)=>{
            return false;
        })
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