const actionTypes={   STORE_UPDATE :'STORE_UPDATE',
    STORE_ADD : 'STORE_ADD',
    STORE_RM :'STORE_RM'};

const initialState = [];

export default  function store(data=initialState,action) {

    switch (action.type) {
        case actionTypes.STORE_UPDATE:
            return action.data;
        case actionTypes.STORE_ADD:

                data.unshift(action.data);
            return  data;
        case actionTypes.STORE_RM:
            return  data.filter(item=>{


                if (item.data.id !== action.data) {
                    return item
                }

            });
        default:
            return data;


    }

}
