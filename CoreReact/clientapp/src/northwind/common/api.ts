import { IEmployee, IEmployeeApi } from "./types"

export const getEmployees = (callback: (employees: IEmployee[]) => void) => {
    fetch('/api/NorthwindEmployees')
    .then(res => res.json())
    .then(json => callback(json as IEmployee[]))
}

export const deleteEmployee = (id: string, callback: (ok: boolean) => void) => 
    fetch('api/NorthwindEmployees/' + id, {method: 'DELETE'}).then(res => callback(res.ok))

export const saveEmployee = (item: IEmployeeApi) => {
    return fetch(item.url, {
        body: JSON.stringify(item.data),
        method: item.method,
        headers: {
            'content-type':'application/json'
        }
    }) as Promise<Response>
}
