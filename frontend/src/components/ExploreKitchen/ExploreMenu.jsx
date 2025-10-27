import { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreKitchen = ({ kitchen, setKitchen }) => {
  const { kitchens, url } = useContext(StoreContext);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Different Kitchen</h1>
      <p className='explore-menu-text'>
        Choose from a variety of homely dishes at Maa Ki Rasoi – where our mission is to serve food
        that is healthy, pure, and made with care.
      </p>

      <div className="explore-menu-list">
        {Array.isArray(kitchens) && kitchens.map((item, index) => (
          <div
            onClick={() =>
              setKitchen(prev => prev === item.name ? "All" : item.name)
            }
            key={index}
            className='explore-menu-list-item'
          >
            <img
              src={`${url}/images/kitchens/${item.image}`}
              className={kitchen === item.name ? "active" : ""}
              alt={item.name}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default ExploreKitchen
