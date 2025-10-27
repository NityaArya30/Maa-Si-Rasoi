import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <img src="/header_img.png" alt="Header Banner" className="header-img" />
            <div className='header-contents'>
                <h2>Order Maa Ke Haath Ka Khana</h2>
                <p>
                    A homely kitchen bringing the taste of maa ke haath ka khana
                    to students living<br></br> away from home. The Mission is to ensure that
                    no student misses the warmth of <br></br> home-cooked food by serving authentic,
                    desi meals filled with motherly love.
                </p>
                <a href='/#explore-menu'><button>View Menu</button></a>
            </div>
        </div>
    )
}

export default Header
