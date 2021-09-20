import Index from '../page/index'
import Collector from "../page/Collector";
import Summary from "../page/Summary";
import Report from "../page/Report";
import Willing from "../page/Willing";

interface router {
    path: string,
    component: any,
    children?: Array<router>
}

const routers: Array<router> = [
    {
        path:"/willing",
        component:Willing
    },
    {
        path:"/report",
        component:Report
    },
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
