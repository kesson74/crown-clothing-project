import { useContext } from "react";
import {CartIconContainer, ShoppingIcon, ItemCount, } from "./cart-icon.styles";

import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIscartOpen = () => setIsCartOpen(!isCartOpen);
 
  return (
    <CartIconContainer onClick={toggleIscartOpen}>
      <ShoppingIcon/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
