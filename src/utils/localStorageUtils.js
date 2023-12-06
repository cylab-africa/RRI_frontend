export const addItemToStorage =(name, data)=>{
    localStorage.setItem(name, JSON.stringify(data))
}

export const getItemFromStorage =(name)=>{
    const item = localStorage.getItem(name)
    if(item){
        return JSON.parse(item)
    }
    return false
}

export const addUser=(data)=>{
    addItemToStorage('user', data)
}

export const getUser=()=>{
    return getItemFromStorage('user')
}

export const addToken =(token)=>{
    addItemToStorage('token', token)
}

export const getToke=()=>{
    return getItemFromStorage('token')
}