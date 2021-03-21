import React from 'react'
import '../../App.css'

const Cards = ({gatos}) => {

    const newWindow = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    }

    const card = gatos.map((gato, index)=>{
        const {id, url, breeds = [], categories = []} = gato;
        let name, origin, category = null;
        if(breeds[0] !== undefined){
            name = breeds[0].name
            origin = breeds[0].origin
        }
        if(categories[0] !== undefined){
            category = categories[0].name
        }
        return (
            <div onClick={()=>{newWindow(url)}} key={id} className='column' style={{backgroundImage: `url(${url})`}}>
                <div style={{borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
                    {name ? (
                            <p className='p-row'>Breed: {name}<br />Country: {origin}</p>
                        ) : null}
                    {category ? (
                            <p className='p-row'>Category: {category}</p>
                    ) : null}
                </div>
            </div>
        )
    })

    return ( 
        <div className='card-container'>
            {card.length > 0 ? (card) : (<div className='loader'></div>)}
        </div>
     );
}
 
export default Cards;