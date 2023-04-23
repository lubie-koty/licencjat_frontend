import { HttpHeaders } from "@angular/common/http"

import { environment } from "src/environments/environment";

export const getHttpOptions = () => {
    const token = localStorage.getItem('token');
    const options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    if (token) {
        options.headers = options.headers.set('Authorization', token);
    }
    return options;
}

export const getApiURI = (endpointUrl: string) => {
    return (target?: any) => {
        let uri = `${environment.apiUrl}/${endpointUrl}`;
        return target ? uri : `${uri}/${target}`;
    }
};