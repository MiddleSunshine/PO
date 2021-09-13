import Index from '../page/index'
import Collector from "../page/Collector";

interface router {
    path: string,
    component: any,
    children?: Array<router>
}

const routers: Array<router> = [
    {
        path:"/points/:pid",
        component:Collector
    },
    {
        path: "/",
        component: Index
    }
]

export default routers
