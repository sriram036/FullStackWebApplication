import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }
    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }
    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees: res.data});
        });
    }
    addEmployee(){
        this.props.history.push('/add-employee/-1');
    }
  render() {
    return (
      <div>
        <h2 className="text-center">Employee List</h2>
        <div>
            <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
        </div>
        <br></br>
        <div className="row">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th style={{textAlign:'center'}}>Employee Name</th>
                        <th style={{textAlign:'center'}}>Employee Email</th>
                        <th style={{textAlign:'center'}}>Employee Salary</th>
                        <th style={{textAlign:'center'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.employees.map(
                            employee => 
                            <tr key = {employee.id}>
                                <td style={{textAlign:'center'}}>{employee.name}</td>
                                <td style={{textAlign:'center'}}>{employee.email}</td>
                                <td style={{textAlign:'center'}}>{employee.salary}</td>
                                <td style={{textAlign:'center'}}>
                                    <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Edit</button>
                                    <button style={{marginLeft: "20px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Remove</button>
                                    <button style={{marginLeft: "20px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </div>
    )
  }
}
export default ListEmployeeComponent