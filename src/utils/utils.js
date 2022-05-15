
import { useSearchParams } from 'react-router-dom';

// const prefix = "https://www.hjxstbserver.xyz:6620/api/v1"
const prefix = "http://127.0.0.1:6610/api/v1"

export function GetPrefix() {
    return prefix
}


export function GetName() {
    const [searchParams] = useSearchParams();
    return  searchParams.get('name')
}


export function SetUri(uri,name) {
    if (name == null || name === "") {
        uri = uri + "/Stone+Bird"
    } else {
        uri = uri + "/" + name
    }
    return uri
}