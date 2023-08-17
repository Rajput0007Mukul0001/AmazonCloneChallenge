export const intitalState = {
    basket:[],
    user:null,
};


//selector ise hum direct add kr paa rahe hai sare prices ko isme se 
export const getBasketTotal = (basket) => 
basket?.reduce((amount,item)=> item.price + amount,0);

const reducer = (state,action) => {

    // console.log(action);
    
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket:[...state.basket,action.item]
            };

            case 'EMPTY_BASKET':
                return {
                    // keep whatever ut empty the basket here kiyunki order ho gya na
                    ...state,
                    basket: [],
                }
        //     break;
        // we didn't directly write the ..state and the filter and remove because it will remove all the item with same id so we do something different we find first index here
            case 'REMOVE_FROM_BASKET':
                
                    const index = state.basket.findIndex(
                        (basketItem)=> basketItem.id===action.id
                    );
                    // copy a basket to temp variable here

                    let newBasket = [...state.basket];

                    if(index>=0){
                        // cutting it by one 
                        newBasket.splice(index,1);
                    }
                    else{
                        console.warn(`cant' remove this prduct ${action.id} as its not in basket!!`)
                    }
                // now we will return the basket kiyunki ye current basket changed wali hi hogi isme 
                    return{
                        ...state,
                        basket:newBasket
                    }
                    
                    
        case 'SET_USER':
            return{
               ...state,
               user:action.user 
            }
                   

        default:
            return state;
        //     break;
    }
};

export default reducer;