import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {BooksList} from './Components/books/BooksList';
import {Ranger} from './Components/books/Ranger';
import { Cart } from './Components/books/Cart';
import Books from './Functions/Books';
// import {book, book1, book2, books} from './Components/image';


function App() {

    const [books, setBooks] = useState([]); //skirta tik atvaizdavimui, ne saugojimui
    const [likes, setLikes] = useState(new Set());
    const [timer, setTimer] = useState(0);
    const change = useRef(false);
    const timerId = useRef();
    const loaded = useRef(false);
    const [sort, setSort] = useState('');
    const [filter, setFilter] = useState(0);

    const [minMax, setMinMax] = useState([0, 0]);
    const [openCart, setOpenCart] = useState(0);


    const [cartView, setCartView] = useState([]);
    const booksStore = useRef([]) //Master store
    const [dataReceived, setDataReceived] = useState(false); //parodys kada duomenys u booksStore yra gauti (true), o kada negauti(false)

    const [booksCartCount, setBooksCartCount] = useState(0);
    const [booksCartPrice, setBooksCartPrice] = useState(0);

    const [cart, setCart] = useState([]);

    useEffect(() => {

        if(!dataReceived){
            return;
        } 
        setCartView(Books.getCartView(cart, booksStore.current));
    }, [dataReceived, cart]);


    useEffect(() => {

        setBooksCartCount(Books.getCartCount(cart));
    }, [cart]);

    useEffect(() => {
        if(!dataReceived){
            return;
        }
        setBooksCartPrice(Books.getCartPrice(cart, booksStore.current));
    }, [dataReceived, cart]);


    useEffect(() => {

        timerId.current = setInterval(() => {
            if (change.current) {
                setTimer(t => t + 1);
                console.log('tik tak chage');
                change.current = false;
            } else {
                console.log('tik tak no');
            }
        }, 5000);
        return () => clearInterval(timerId.current);

    }, [])

    useEffect(() => {
        axios.get('https://in3.dev/knygos/')
        .then(res => {
            booksStore.current = res.data;
            setDataReceived(true);
            setBooks([...booksStore.current])
            let min = booksStore.current[0].price;
            let max = min;
            booksStore.current.forEach(b => {
                min = min > b.price ? b.price : min;
                max = max < b.price ? b.price : max;
            })
            setMinMax([min, max]);
            setFilter(Math.floor(min));
        });
        // setDataReceived(true);
    }, []);

    useEffect(() => {
        let l = localStorage.getItem('booksLikes');
        if (null === l) {
            l = JSON.stringify([]);
        }
        l = JSON.parse(l);
        setLikes(new Set(l));
    }, []);

    useEffect(() => {
        if (loaded.current) {
            localStorage.setItem('booksLikes', JSON.stringify([...likes]));
        }
        loaded.current = true;
    }, [timer, likes]);


    //SORT

    // useEffect(() => {
    //     const booksCopy = [...booksStore.current];
    //     switch (sort) {
    //         case 'asc':
    //             booksCopy.sort((a, b) => a.price - b.price);
    //             break;
    //         case 'desc':
    //             booksCopy.sort((a, b) => b.price - a.price); 
    //             break;
    //         default:
    //     }
    //     setBooks(booksCopy);
    // }, [sort]);


    //FILTER

    // useEffect(() => {
    //     setBooks(booksStore.current.filter(b => b.price >= filter));
    
    // }, [filter]);



    // SORT IR FILTER VIENU METU

    useEffect(() => {

        const actionObj = {
            type: 'change_list', // cia tik iliustracijai
            payload: {
                filter: filter,
                sort: sort
            }
        }
        doChangeList(actionObj);    
    }, [filter, sort]);

    // FUNKCIJA REAGUOJANTI I MYGTUKO PASPAUDIMA

    const addBtnClick = (id) => {
        // Books.addToCart(id, cart)
        console.log(id)
        setCart(c => Books.addToCart(id, cart));
    }

    const doChangeList = action => {
        const booksCopy = [...booksStore.current];
        switch (action.payload.sort) {
            case 'asc':
                booksCopy.sort((a, b) => a.price - b.price);
                break;
            case 'desc':
                booksCopy.sort((a, b) => b.price - a.price); 
                break;
            default:
        }
        setBooks(booksCopy.filter(b => b.price >= action.payload.filter));
    }
       

    const likeButtonPressed = id => {
       change.current = true;
       const likesCopy = new Set(likes); 
       likesCopy.has(id) ? likesCopy.delete(id) : likesCopy.add(id);
       setLikes(likesCopy);
    }

    return (
        
        <div className="App">
            <h1>Books Store</h1>
            <div className="kvc">
                <div className='arrow_container'>
                    <svg className='arrow arrow_up ' onClick={() => setSort('asc')}>
                        <use xlinkHref="#arrow"></use>
                    </svg>
                    <svg className='arrow arrow_down'onClick={() => setSort('desc')}>
                        <use xlinkHref="#arrow"></use>
                    </svg>
                </div>
                <div> 
                    <Ranger minMax={minMax} filter={filter} setFilter={setFilter}/>
                </div>
            </div>
            <BooksList likeButtonPressed={likeButtonPressed} books={books} addBtnClick={addBtnClick} likes={likes}></BooksList>
            <div className="cart">
                <div className="count">{booksCartCount}</div>
                <svg onClick={() => setOpenCart(s => !s)}>
                    <use  xlinkHref="#cart"></use>
                </svg>
                <span>{booksCartPrice}</span>
                <div className="bin">
                    <Cart openCart={openCart} setOpenCart={setOpenCart} cartView={cartView}/>
                </div>
            </div>
            
        </div>
       
    );
}

export default App;