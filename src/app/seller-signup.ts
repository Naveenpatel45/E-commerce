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
    "id" ?: string,
    "quantity" ?: string
}

export interface UserSignup{
    "name":string,
    "email":string,
    "password":string,
    "id" ?:string
}

export interface cartItem{
    "name": string,
    "price": string,
    "category": string,
    "color": string,
    "description": string,
    "url": string,
    "quantity" ?: string | undefined,
    "userId":string | undefined,
    "productId":string | undefined,
    "id" ?:string
}
export interface cartPrice{
   "price" : number,
   "tax" : number,
   "delivery" : number,
   "discount": number,
   "total" : number,
}



