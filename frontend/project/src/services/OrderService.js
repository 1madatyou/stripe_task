import {API_BASE_URL} from "../const"


const useOrderService = () => {

    const _transformItem = ({data}) => {
        const {id, name, description, price} = data 

        return {
            id,
            name,
            description,
            price
        }
    }

    const getItems = async () =>  {
        const response = await fetch(API_BASE_URL + 'items',
        {method: "GET"})
        
        console.log(API_BASE_URL)
        console.log(response.url)
        if (response.status === 200) {
            const data = await response.json()
            return data.map((item) => _transformItem(item))
        }
    }

    let context = {
        getItems
    }

    return context;

}

export default useOrderService;