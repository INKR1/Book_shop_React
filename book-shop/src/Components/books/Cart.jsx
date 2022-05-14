export function Cart({openCart, setOpenCart, cartView}) {

    if(!openCart) return null;

    return(
        <> 
        <div className="nice-cart">
            <div className="close" onClick={() => setOpenCart(false)}>X</div>
            {
                cartView.map(b => <div className="cart-line" key={b.id}><b>{b.title}</b><i>{b.count}</i><u>{b.count * b.price} eur</u></div>)
            }
        </div>
        </>
    )
}