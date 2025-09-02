
interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
}

interface IResponse {
    statusCode: number,
    message?: string,
    data?: object
}

interface IOdataResponse<T> {
    '@odata.count'?: number;
    '@odata.nextLink'?: string;
    '@odata.context'?: string;
    value: T[]
}