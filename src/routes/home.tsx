import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { useAppDispatch } from '../services/hooks';
import Dropdown from '../components/Dropdown';
import { departments, states } from '../services/utils';
import { Employee } from '../../typing';
import { useState } from 'react';
import { createEmployee } from '../services/employeesSlice';
import { db } from '../services/api';

export default function Index() {
  const dispatch = useAppDispatch()
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const newEmployee : Employee = {
      id: db.length + 1,
      firstName: String(data.firstName),
      lastName: String(data.lastName),
      dateOfBirth: String(data.dateOfBirth),
      startDate: String(data.startDate),
      street: String(data.street),
      city: String(data.city),
      state: String(data.state),
      zipCode: String(data.zipCode),
      department: String(data.department)
    };
    dispatch(createEmployee(newEmployee));
    setIsSuccess(true);
  }

  return (
    <div className="font-sans">
      <Modal state={isSuccess} message="Employee created successfuly"/>
      <h1 className="text-4xl font-black mb-4 text-center">HRnet</h1>
      <div className="w-fit mx-auto">
        <Link to="/employee-list" className="p-4 border bg-slate-50 rounded-lg my-4 hover:bg-slate-200/50 transition-all">View current employees</Link>
      </div>
      <section id="form" className="grid gap-4 mt-4">
        <h3 className="text-2xl text-center">Create employee</h3>
        <form method="post" className="grid gap-4 employeeForm" onSubmit={handleSubmit}>
          <label>
            First name
            <input type="text" name="firstName" required />
          </label>
          <label>
            Last name
            <input type="text" name="lastName" required />
          </label>
          <label>
            Date of Birth
            <input type="date" name="dateOfBirth" required />
          </label>
          <label>
            Start Date
            <input type="date" name="startDate" required />
          </label>
          <div className="border-2 border-black p-4 grid gap-4 relative employeeForm">
            <h4 className="p-1 bg-white -top-5 left-2 absolute text-xl">Address</h4>
            <label>
              Street
              <input type="text" name="street" required />
            </label>
            <label>
              City
              <input type="text" name="city" required />
            </label>
            <Dropdown name="state" options={states} label="State" value="abbreviation" displayValue="name"/>
            <label>
              Zip Code
              <input type="text" name="zipCode" required />
            </label>
          </div>
          <Dropdown name="department" options={departments} label="Department" value="department" displayValue="department" />
          <button type="submit" className="p-4 border bg-slate-50 rounded-lg my-4 hover:bg-slate-200/50 transition-all">Save</button>
        </form>
      </section>
    </div>
  );
}