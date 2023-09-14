import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
  
    constructor(props){
        super(props) 
        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({employee: res.data});
        })
    }

    render() {
    return (
      <div>
        <br></br>
        <div className = "card col-md-6 offset-md-3">
            <h3 className = "text-center"> View Employee Details</h3>
            <div className = "card-body">
                <div className = "form-group">
                    <label style={{fontWeight: "bold"}}>Employee Name :</label>
                    {"  "+ this.state.employee.name}
                </div>
                <div className = "form-group">
                    <label style={{fontWeight: "bold"}}>Employee Mail Id : </label>
                    {"  " + this.state.employee.email }
                </div>
                <div className = "form-group">
                    <label style={{fontWeight: "bold"}}>Employee Salary : </label>
                    {"  " + this.state.employee.salary }
                </div>
                <a href = "/employees"><button className = "btn btn-info">Back</button></a>
            </div>
        </div>
      </div>
    )
  }
}
export default ViewEmployeeComponent