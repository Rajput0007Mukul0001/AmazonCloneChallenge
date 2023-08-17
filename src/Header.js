import React from 'react'
import './Header.css'
// import SearchIcon from '@mui/icons-material/Search';

import SearchIcon from '@material-ui/icons/Search';
import Product from './Product';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import {Link} from "react-router-dom"

import {useStateValue} from './StateProvider';
import { auth } from './firebase';
function Header() {

const [{basket,user},dispatch] = useStateValue();
 
const handleAuthentication=()=>{
  if(user){
    auth.signOut();
  }
}


  return (
    <div className='header'>
    
    <Link to="/">  
    <img 
    className="header__logo"
    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt='amazon-logo'
    />
    </Link>

<div
className="header__search">
<input className="header__searchInput" type='text'/>
    {/* logo  */}

<SearchIcon className="header__searchIcon"/>

</div>

{/* nav */} 

<div className="header__nav">
{/* <Link to="./login"> isko change kr denge jb koi user ni hoga tb wapis hame login page hi dikhaye bs isme ye signout kr dega or fir hame sign in krne per page change kr dega login wala kr dega  */}
{/* user ki details change krne ke liye check out page me change krna padega isme bs mereko  */}
<Link to={!user && '/login'}>
<div className="header__option" onClick={handleAuthentication}>

<span className="header__optionLineOne">{(user)?`Hello ${user.email}`:'Hello Guest'}</span>
<span className="header__optionLineTwo">{(user)?'Sign Out':'Sign In'}</span>

</div>
</Link>

<Link to={'/orders'}>
<div className="header__option">
<span className="header__optionLineOne">Returns</span>
<span className="header__optionLineTwo">& Orders</span> 
</div>
</Link>

<div className="header__option">
<span className="header__optionLineOne">Your</span>
<span className="header__optionLineTwo">Prime</span>
</div>

<Link to="/checkout">
<div className='header__optionBasket'>
<ShoppingBasketIcon/>
<span className="header__optionLineTwo  
header__optionCount">{basket?.length}</span>

</div>

{/* <span>{Product.name.p} hey</span> */}


</Link>
{/* basket me ?.length isiliye taki error me ye freak out na ho  */}


</div>

</div>
  )
}

export default Header