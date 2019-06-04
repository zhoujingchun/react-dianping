const actionTypes={   STORE_UPDATE :'STORE_UPDATE',
                       STORE_ADD : 'STORE_ADD',
                       STORE_RM :'STORE_RM'};

export function update(data) {
    return {
        type:actionTypes.STORE_UPDATE,
        data
    }

}

export function add(data) {
    return {
        type:actionTypes.STORE_ADD,
        data
    }
}
export function remove(data) {
   data =data.data.id;
   return {
        type:actionTypes.STORE_RM,
        data
    }

}