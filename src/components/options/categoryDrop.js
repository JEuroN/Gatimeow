import React, {useState, useEffect} from 'react'
import '../../App.css'

const DropCategories = ({search, setSearch, options}) => {

    const {breeds, categories} = options;

    const {param, opt} = search;

    const [isDown, setIsDown] = useState(false);
    
    const [isActive, setIsActive] = useState('No selected');

    useEffect(()=>{
        setIsActive('No selected');
    }, [search.opt])

    const handleDown = (sFilter, active, sParam = param, option = opt) => {
        setSearch({param: sParam, opt: option, filter: sFilter});
        setIsDown(!isDown);
        setIsActive(active);
    }
    
    const dropBreeds = breeds.map((pics, index) => {
        let {name, id} = pics;
        return (
            <button key={id} onClick={()=>{handleDown(id, name)}}>{name}</button>
        )
    })

    const dropCategories = categories.map((pics, index) => {
        let {name, id} = pics; 
        return (            
            <button key={id} onClick={()=>{handleDown(id, name)}}>{name}</button>
            )
    })

    return ( 
        <div>
        <div>
            <div className='drop-header'>
                <button className='setButton' onClick={()=>{setIsDown(!isDown)}}>{isActive}</button>
                {isDown && search.opt === 1 ? ( (<div className='openDrop'><button onClick={()=>{setIsDown(!isDown)}}>{isActive}</button></div>)) : <div className='closedDrop'></div>}
                {isDown && search.opt === 2 ? (<div style={{minWidth: '30vh'}} className='openDrop'>{dropBreeds}</div>) : <div className='closedDrop'></div>}
                {isDown && search.opt === 3 ? (<div style={{minWidth: '30vh'}} className='openDrop'>{dropCategories}</div>) : <div className='closedDrop'></div>}
            </div>
        </div>
        </div>
     );
}
 
export default DropCategories;