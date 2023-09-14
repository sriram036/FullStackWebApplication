import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
  
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            email: '',
            salary: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res) =>{
            let employee = res.data;
            this.setState({
                name : employee.name,
                email : employee.email,
                salary : employee.salary
            });
        });
    }
    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {name: this.state.name, email: this.state.email, salary: this.state.salary};
        console.log('employee => ' + JSON.stringify(employee));
        EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
            this.props.history.push('/employees');
        });
    }
    cancel(){
        this.props.history.push('/employees');
    }
        changeNameHandler=(event) => {
            this.setState({name: event.target.value});
        }
        changeEmailHandler=(event) => {
            this.setState({email: event.target.value});
        }
        changeSalaryHandler=(event) => {
            this.setState({salary: event.target.value});
        }
        render() {
        return (
          <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Update Employee</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Employee Name: </label>
                                    <input placeholder="Name" name="name" className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>Employee Email: </label>
                                    <input placeholder="Email" name="email" className="form-control"
                                            value={this.state.email} onChange={this.changeEmailHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>Employee Salary: </label>
                                    <input placeholder="Salary" name="salary" className="form-control"
                                            value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                </div>
    
                                <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )
      }
}
export default UpdateEmployeeComponent