import config from "./setting";

export function requestApi(api,option={}){
    let domain=config.back_domain;
    if (sessionStorage.getItem(config.back_domain_key)){
        domain=sessionStorage.getItem(config.back_domain_key);
    }
    return fetch(domain+api,option);
}