export function getQueryParam(param:string):string | null {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get(param);
}