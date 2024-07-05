import React, { useEffect, useState } from 'react'
import './App.css'
import cafe from './img/bg-cafe.jpg'
import vector from './img/vector.svg'
import star from './img/Star.svg'
import star_fill from './img/Star_fill.svg'



export async function getData(){
  const res = await fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json')
  const data = await res.json()
  return data;
}

export default function App() {

  const [active1,setActive1] = useState(true)
  const [active2,setActive2] = useState(false)
  const [coffee,setCoffee] = useState([])
  const [type,setType] = useState('')


  useEffect(()=>{
    const fetchData = async () => {
      const data = await getData()
      setCoffee(data)
      console.log(data)
    }
    fetchData();
  },[])

  const handleClick1 = (e) =>{
    setActive1(true)
    setActive2(false)
    if(type === 'available'){
      setType('')
    }
  }
  
  const handleClick2 = () =>{
    setActive1(false)
    setType('available')
    setActive2(true)
  }

  useEffect(() => {
    const data = coffee;

    if (type === 'available') {
      const filteredData = coffee.filter((cof) => cof.available);
      setCoffee(filteredData);
    }
   
  }, [type, coffee]);

  return (
    <div className='container'>
      <img src={cafe} alt="bg-cafe" className='cafe-bg'/>

      <div className='content-container'>

        <img src={vector} alt="vector"  className='vector'/>

        <div className='content'>
            <h2>Our Collection</h2>

            <div className='desc'>
              <p>Introducing our Coffee Collection, a selection of unique coffees from different roast types and origins, expertly roasted in small batches and shipped fresh weekly.</p>
            </div>

            <div className='btn-container'>
              <button onClick={handleClick1} className='btn' value='all'  style={{background:active1?'#6F757C':'transparent'}}>All Products</button>
              <button onClick={handleClick2} className='btn' style={{background:active2?'#6F757C':'transparent'}}>Available Now</button>
            </div>
          </div>

            
          <div className='card-container'>
              {
                coffee.map((coffee)=>(
                  <div key={coffee.id} >
                    <div className="card">

                      {coffee.popular?<div className="popular">
                          <h5>popular</h5>
                      </div>:''}

                      <img src={coffee.image} alt={coffee.name} />

                      <div className='price'>
                          <h3>{coffee.name}</h3>
                          <h4>{coffee.price}</h4>
                      </div>

                      <div className='rate-container'>
                        <div className='rate'>
                          <img src={coffee.votes === 0?star:star_fill} alt='star' className='star'/>
                          <h4>{coffee.rating}</h4>
                          <h4 className='votes'>({coffee.votes} votes)</h4>
                        </div>
                        <h3>{coffee.available?'':'Sold out'}</h3>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
        
        </div>
    </div>
  )
}
