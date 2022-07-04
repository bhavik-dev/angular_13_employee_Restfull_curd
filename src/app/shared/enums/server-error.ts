export enum ServerError {
    NONE = '200',
    CREATED = '201',
    NO_DATA_FOUND = '204',
    DUPLICATE = '211',
    BAD_REQUEST = '400',
    UNAUTHORIZED = '401',
    TOKEN_EXPIRED = '403',
    NOT_FOUND = '404',
    INTERNAL_SERVER_ERROR = '500',
    NOT_IMPLEMENTED = '501',
    SERVER_UNAVAILABLE = '503',
    UNKNOWN = '0'
}
