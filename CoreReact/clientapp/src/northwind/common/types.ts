export interface IEmployee{
    id: number
    lastName: string
    firstName: string
    title: string
    titleOfCourtesy: string
    birthDate: string
    hireDate: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    homePhone: string
    extension: string
    photo: string
    notes: string
    reportsTo: number
    photoPath: string    
}

export type EmployeeViewType = 'new' | 'edit' | 'list'
export interface IEmployeeViewState{
    type: EmployeeViewType
    id: number
    employee?: IEmployee
}

export interface IEmployeeApi {
    url: string
    method: string
    data: IEmployee
}

export interface INorthwindTabState{
    eventKey: string
}

export interface INorthwindStates{
    northwindTabState: INorthwindTabState
    employeeViewState: IEmployeeViewState
    customerViewState: ICustomerViewState
    orderViewState: IOrderViewState
    orderDetailState: IOrderDetail[]
}

export interface ICustomerViewState{
    id: string
}

export interface ICustomer{
    id:	string
    companyName: string
    contactName: string
    contactTitle: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    phone: string
    fax: string
}

export interface IOrder {
    id: number
    customerId: string
    employeeId: number
    orderDate: string
    requiredDate: string
    shippedDate: string
    shipVia: number
    freight: string
    shipName: string
    shipAddress: string
    shipCity: string
    shipRegion: string
    shipPostalCode: string
    shipCountry: string
    customer: ICustomer
}

export interface IOrderViewState{
    loading: boolean
    orders: IOrder[]
}

export interface IOrderDetail{
    id: string
    orderId: number
    productId: number
    unitPrice: string
    quantity: number
    discount: number
    product: IProduct
}

export interface IProduct{
    id: number
    productName: string
    supplierId: number
    categoryId: number
    quantityPerUnit: string
    unitPrice: string
    unitsInStock: number
    unitsOnOrder: number
    reorderLevel: number
    discontinued: number
    supplier: ISupplier
  }

  export interface ISupplier{
    id: number
    companyName: string
    contactName: string
    contactTitle: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    phone: string
    fax: string
    homePage: string
  }
