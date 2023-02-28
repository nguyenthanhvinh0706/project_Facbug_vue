import store from '../store';

const ifNotAuthenticated = (to, from, next) => {
    if(!store.getters.isLogin) {
        console.log('123123');
        next(); 
    } else {
        console.log('home-page');
        next({
            name: 'home-page',
            query: {
                redirect: to.name
            }
        })
    }
    
}

const ifAuthenticated = (to, from, next) => {
    if(store.getters.isLogin) {
        console.log('4314234');
        next(); 
    } else {
        console.log('login');
        next({
            name: 'login',
            query: {
                redirect: to.name
            }
        })
    }
}

export {
    ifNotAuthenticated, ifAuthenticated
}