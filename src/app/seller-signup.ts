export interface SellerSignup {
    "name": string,
    "password":string,
    "email":string,
    "id" ?: string
}

export interface productAdd{
    "name": string,
    "price": string,
    "category": string,
    "color": string,
    "description": string,
    "url": string,
    "id" ?: string
}

export interface UserSignup{
    "name":string,
    "mail":string,
    "password":string,
    "id" ?:string
}
