export interface IEmployee{
    employeeId:	number
    lastName: string
    firstName: string
    title: string
    reportsTo: number
    birthDate: string
    hireDate: string
    address: string
    city: string
    state: string
    country: string
    postalCode: string
    phone: string
    fax: string
    email: string
}

export interface IAlbum{
    albumId: number
    title:	string
    artistId: number
    artist: IArtist
    tracks:	ITrack[]
}

export interface IArtist{
    artistId: number
    name: string
    albums: IAlbum[]
}

export interface ITrack{
    trackId: number
    name: string
    albumId: number
    mediaTypeId: number
    genreId: number
    composer: string
    milliseconds: number
    bytes: number
    unitPrice:	string
}

export interface IGenre{
    genreId: number
    name:string
    tracks:ITrack[]
}

export interface IChinookStates{
    employeesState: IEmployee[]
    albumsState: IAlbum[]
    artistsState: IArtist[]
    genresState: IGenre[]
    tracksState: ITrack[]
    customersState: ICustomer[]
    invoicesState: IInvoice[]
    saleRecordsState: ISaleRecord[]
    shoppingCart: IShoppingCart
    loggedInEmployeeId: number
    selectedCustomerId: number
    viewState: ChinookView
}

export interface ICustomer{
    customerId: number
    firstName: string
    lastName: string
    company: string
    address: string
    city: string
    state: string
    country: string
    postalCode: string
    phone: string
    fax: string
    email: string
    supportRepId: number
}

export interface IShoppingCart{
    trackIds: number[]
    albumIds: number[]
}

export interface IInvoice{
    invoiceId: number
    customerId: number
    invoiceDate: string
    billingAddress: string
    billingCity: string
    billingState: string
    billingCountry:	string
    billingPostalCode: string
    total: string
    invoiceItems: IInvoiceItem[]
}

export interface IInvoiceItem{
    invoiceLineId: number
    invoiceId: number
    trackId: number
    unitPrice: string
}

export type ChinookView = 'store' | 'checkout' | 'report'

export interface IOrder{
    employeeId: number
    customerId: number
    trackIds: number[]
    totalPrice: number    
}

export interface ISaleRecord{
    saleRecordId: number
    employeeId: number
    invoiceId: number   
}
