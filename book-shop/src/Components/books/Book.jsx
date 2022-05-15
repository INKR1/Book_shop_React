


export function Book({ book, likeButtonPressed, like, addBtnClick }) {

  return (
    <div className="kv big kv_3">
        <img src={book.img} alt='books'/>
        <small style={{overflow:'auto'}}>{book.title}</small>
        <i><strong>{book.author}</strong></i>
        <div className="price">{book.price.toFixed(2)} Eur</div>
        
        <svg className={like ? 'like' : ''} onClick={() => likeButtonPressed(book.id)}>
            <use xlinkHref="#heart"></use>
        </svg>
        <button className="add" onClick={() => addBtnClick(book.id)}>Add</button>
    </div>
    )
}