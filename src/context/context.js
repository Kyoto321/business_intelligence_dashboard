import { createContext, useState } from "react";


export const AppContext = createContext()

// create context provider function
const AppContextProvider = (props) => {

 
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    

    const backendUrl = '#'


    const value = {
        token, setToken,
        backendUrl, 
    }



    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider