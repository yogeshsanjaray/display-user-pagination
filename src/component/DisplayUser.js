import React, { Component } from 'react';
import axios from "axios"


class DisplayUser extends Component{
    state = {
        users: null,
        total: null,
        per_page: null,
        current_page: null
      }

    componentDidMount() {
    this.makeHttpRequestWithPage(1);
    }

    makeHttpRequestWithPage = async pageNumber => {
        let response = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`)
    
    
        this.setState({
          users: response.data.data,
          total: response.data.total,
          per_page: response.data.per_page,
          current_page: response.data.page,
        });
      }

      render() {

        let renderPageNumbers;

        const pageNumbers = [];

        if (this.state.total !== null) {
            for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
                pageNumbers.push(i);
            }
    
            renderPageNumbers = pageNumbers.map(number => {
                let classes = this.state.current_page === number ?"active": '';
        
                return (
                    <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
                );
            });
        }
    
        return (
    
    
          <div className="app">
    
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {!this.state.users?null:this.state.users.map(user => (
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td><img style={{height:"50px",width:"50px"}} src={user.avatar} alt="user" /></td>
                </tr>
            ))}
              </tbody>
            </table>
    
    
            <div className="pagination">
              <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
              {renderPageNumbers}
              <span onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
            </div>
    
          </div>
        );
      }
    
}

export default DisplayUser;