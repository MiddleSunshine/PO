import WordsList from "../page/WordsList";
import WordEdit from "../page/WordEdit.js";
import Index from '../page/index'
import webIndex from '../page/webIndex.js';
import SentenceList from '../page/SentenceList';
import SentenceEdit from "../page/SentenceEdit";
import CheckList from "../page/CheckList";

interface router {
    path: string,
    component: any,
    children?: Array<router>
}

const routers: Array<router> = [
    {
        path: "/check/list",
        component: CheckList
    },
    {
        path: '/sentence/create/:id',
        component: SentenceEdit
    },
    {
        path: '/sentence/edit/:id',
        component: SentenceEdit
    },
    {
        path: '/sentence/list',
        component: SentenceList
    },
    {
        path: "/words/list",
        component: WordsList
    },
    {
        path: "/words/edit/:id",
        component: WordEdit
    },
    {
        path: "/words/create/:id",
        component: WordEdit
    },
    {
        path: '/web',
        component: webIndex
    },
    {
        path: "/",
        component: Index
    }
]

export default routers
