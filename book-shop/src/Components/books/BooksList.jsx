 import { Book } from './Book'
import { Loader } from "./Loader";

export function BooksList({books, likeButtonPressed, likes, addBtnClick}) {

    return (
        <div className="kvc">
        {
           books.length ? books.map(b => <Book key={b.id} like={likes.has(b.id)} book={b} likeButtonPressed={likeButtonPressed} addBtnClick={addBtnClick}></Book>) : <Loader/>
        }
        </div>
    )
}
