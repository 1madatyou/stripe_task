import {API_BASE_URL} from "../const"


const useOrderService = () => {

    const _transformItem = (data) => {
        const {id, name, description, price} = data 

        return {
            id,
            name,
            description,
            price: Number(price)
        }
    }

    const getItems = async () =>  {
        const response = await fetch(API_BASE_URL + 'items',
        {method: "GET"})
        
        if (response.status === 200) {
            const data = await response.json()
            return data.map((item) => _transformItem(item))
        }
    }

    const createOrder = async(item_list) => {
        console.log(item_list)
        const response = await fetch(API_BASE_URL + 'create_order',
        
        {
            method: "POST",
            body: JSON.stringify({"items": item_list.map((item) => item.id)}),
            headers: {'content-type': "application/json"}
        })

        console.log(response.status)
        if (response.status === 200) {
            const data = await response.json()
            return data.client_secret
        }
    }

    let context = {
        getItems,

        createOrder
    }

    return context;

}

export default useOrderService;