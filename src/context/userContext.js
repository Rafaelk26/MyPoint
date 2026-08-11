import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }){
    // State global user
    const [user, setUser] = useState(true);

    return(
        <UserContext.Provider value={{ user }}>
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