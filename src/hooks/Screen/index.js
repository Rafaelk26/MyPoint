import { useEffect } from 'react';

// Hooks
import { Loading } from '../Loading';

export function Screen({ loading, onUnmount, children }){

    useEffect(()=>{
        return ()=>{
            if(onUnmount){
                onUnmount();
            }
        }
    },[]);

    if(loading){
        return <Loading/>
    }

    return children;
}