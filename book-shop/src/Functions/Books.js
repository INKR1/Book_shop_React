class Books {

    // KNYGU KIEKIS KREPSELY
    static getCartCount(cart) {
        let totalCount = 0;
        cart.forEach(product => {
             totalCount += product.count;
        });
        return totalCount;
    }
    // static getCartPrice(cart, booksStore) {
    //     let totalPrice = 0;
    //     cart.forEach(product => {
    //         const book = booksStore.find(b => b.id === product.id);
    //         totalPrice += book.price * product.count;
    //     });
    //     return totalPrice + 'Eur';
    // }

// GAUNAM BENDRA KREPSELIO KAINA
    static getCartPrice(cart, booksStore) {
        let totalPrice = 0;
        cart.forEach(c => {
            totalPrice += this.getBookById(c.id, booksStore).price * c.count;
        });
        return totalPrice.toFixed(2) + 'Eur';
    }
//  PERZIURIM KOKIE PRODUKTAI KREPSELYJE
    static  getCartView(cart, booksStore) {
        const view = [];
        cart.forEach(c => {
            view.push({...this.getBookById(c.id, booksStore), count: c.count});
        });
        return view;
    }

    static getBookById(id, booksStore, returnIndex = false) {
        let index = -1;
        booksStore.forEach((b, i) => {
            if (id === b.id) {
                index = i;
            }
        });
        return returnIndex ? index : booksStore[index];
    };

    static addToCart(id, cartIn) {
        const cart = [...cartIn];
        const index = this.getBookById(id, cart, true);
        if (index === -1) {
            cart.push({ id: id, count: 1 });
        } else {
            // console.log(cart)
            cart[index].count++;

        }
        return cart;
    }

      
};
export default Books;