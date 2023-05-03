import { environment } from "src/environments/environment";

export const tokenGetter = () => {
    return localStorage.getItem('token');
}

export const getApiURI = (endpointUrl: string) => {
    return (target?: any) => {
        let uri = `${environment.apiUrl}/${endpointUrl}`;
        return target ? `${uri}/${target}` : uri;
    }
};