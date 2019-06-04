const actionTypes={   ORDER_UPDATE :'STORE_UPDATE',
    ORDER_ADD : 'STORE_ADD',
    ORDER_RM :'STORE_RM'};

export function update(data) {
    return {
        type:actionTypes. ORDER_UPDATE,
        data
    }

}

export function add(data) {
    return {
        type:actionTypes.ORDER_ADD,
        data
    }
}
export function remove(data) {
    data =data.data.id;
    return {
        type:actionTypes.ORDER_RM,
        data
    }

}