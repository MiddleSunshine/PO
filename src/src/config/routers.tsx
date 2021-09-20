import Index from '../page/index'
import Collector from "../page/Collector";
import Summary from "../page/Summary";

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
        path:"/summary/points/:pid",
        component:Summary
    },
    {
        path: "/",
        component: Index
    }
]

export default routers
