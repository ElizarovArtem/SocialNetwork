import React from "react";
import {Preloader} from "../Components/common/Preloader/Preloader";


export const WithSuspense = (Component: Function) => {
    return (props: any) => {
        return (
            <React.Suspense fallback={<Preloader/>}>
                <Component {...props}/>
            </React.Suspense>
        )
    }
}