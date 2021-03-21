import React from 'react'
import Cards from '../options/cards'
import '../../App.css'
import left_arrow from '../../Assets/left-arrow.png'
import right_arrow from '../../Assets/right-arrow.png'


const Random = ({album, handleAmount}) => {

    return ( 
        <div style={{width: '100%', height: '100%'}}>
            <Cards gatos={album}/>
            <footer className='footer'>
                <button onClick={()=>{handleAmount(false, {opt: 0})}}><img src={left_arrow} alt='left'></img></button>
                <span> I want more kitties</span>
                <button onClick={()=>{handleAmount(true, {opt: 0})}}><img src={right_arrow} alt='right'></img></button>
            </footer>
        </div> 
    );
}
 
export default Random;