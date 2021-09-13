import Index from '../page/index'

interface router {
    path: string,
    component: any,
    children?: Array<router>
}

const routers: Array<router> = [
    {
        path: "/",
        component: Index
    }
]

export default routers
