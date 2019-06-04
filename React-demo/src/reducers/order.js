const actionTypes={   ORDER_UPDATE :'STORE_UPDATE',
   ORDER_ADD : 'STORE_ADD',
   ORDER_RM :'STORE_RM'};

const initialState = [];

export default  function store(data=initialState,action) {

    switch (action.type) {
        case actionTypes.ORDER_UPDATE:
            return action.data;
        case actionTypes.ORDER_ADD:

            data.unshift(action.data);
            return  data;
        case actionTypes.ORDER_RM:
            return  data.filter(item=>{
                if (item.data.id !== action.data) {
                    return item
                }

            });
        default:
            return data;


    }

}
