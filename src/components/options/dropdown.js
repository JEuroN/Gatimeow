import React, {useState} from 'react'
import '../../App.css'

const Dropdown = ({search, setSearch, options}) => {

    const [isDown, setIsDown] = useState(false);

    const handleDown = (param, option, filter = 'No selected') => {
        setSearch({param: param, opt: option, filter});
        setIsDown(!isDown);
    }
    
    return ( 
    <div>
        <div className='drop-header' >
            <button className='setButton' onClick={()=>{setIsDown(!isDown)}}>{search.param}</button>
        </div>
        {isDown ? (<div className='openDrop' >
            <button className='btnOption' onClick={()=>(handleDown('Ninguna', 1))}>None</button>
            <button className='btnOption' onClick={()=>(handleDown('Raza', 2))}>Breed</button>
            <button className='btnOption' onClick={()=>(handleDown('Categoria', 3))}>Category</button>
        </div>) : <div className='closedDrop'></div>}
    </div> 
    );
}
 
export default Dropdown;