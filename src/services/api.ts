import { Employee } from "../../typing"

export const db = JSON.parse(localStorage.getItem('db') || '[]') as Employee[]


export const getEmployees = () => {
  return db
}

export const createLocalEmployee = (employee: Employee) => {
  const db = JSON.parse(localStorage.getItem('db') || '[]') as Employee[]
  db.push(employee)
  localStorage.setItem('db', JSON.stringify(db))
  return employee
}

export const nextId = () => {
    return db.length
}