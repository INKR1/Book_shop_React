export function Cart({openCart, setOpenCart, cartView}) {

    if(!openCart) return null;

    return(
        <> 
        <div className="nice-cart">
            <div className="close" onClick={() => setOpenCart(false)}>X</div>
            {
                cartView.map(b => <div className="cart-line" key={b.id}><b>{b.title}</b><p>{b.count} vnt.</p><i>{b.count * b.price.toFixed(2)} Eur</i></div>)
            }
        </div>
        </>
    )
}