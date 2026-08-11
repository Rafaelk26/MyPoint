import { createContext, useState } from 'react';

// Functions
import { findUser } from '../functions/findUser';

export const UserContext = createContext();

export function UserProvider({ children }){
    // State global user
    const [user, setUser] = useState(null);

    async function getUser(user){
        const data = await findUser(user.id);
        setUser(data);
        return data;
    }

    return(
        <UserContext.Provider value={{ user, getUser }}>
            { children }
        </UserContext.Provider>
    )
}

// user {
//  id,
//  name,
//  email,
//  point: [
//  {id: 1, name: 'Entrada', hour: '--:--', done: false},
//  {id: 2, name: 'Almoço (Ida)', hour: '--:--', done: false},
//  {id: 3, name: 'Almoço (Volta)', hour: '--:--', done: false},
//  {id: 4, name: 'Saída', hour: '--:--', done: false},
// ],
//  token,
// }