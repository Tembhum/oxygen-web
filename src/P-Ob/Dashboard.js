import React from "react";
import "../css/dashboard.css";
import "../css/widget.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Dashboard extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         machines: [
            { id: 1, serialnumber: 'aaaaaaaaaa', phonenum: '0000000000', available: true  },
            { id: 2, serialnumber: 'bbbbbbbbbb', phonenum: '1111111111', available: true },
            { id: 3, serialnumber: 'cccccccccc', phonenum: '2222222222', available: false },
            { id: 4, serialnumber: 'dddddddddd', phonenum: '3333333333', available: true }
         ]
      }
   }

   renderTableHeader() {
      let header = Object.keys(this.state.machines[0])
      return header.map((key, index) => {
        if( key != 'available' ){
            return <th key={index}>{key.toUpperCase()}</th>
        }
      })
   }

   renderTableData() {
      return this.state.machines.map((machine, index) => {
         const { id, serialnumber, phonenum, available } = machine //destructuring
         return (
            <tr key={id} bgcolor={!available? "grey" : "white"}>
               <td ><font color={available? "grey" : "white"}>{id}</font></td>
               <td ><font color={available? "grey" : "white"}>{serialnumber}</font></td>
               <td ><font color={available? "grey" : "white"}>{phonenum}</font></td>
               <td> <Button variant={!available? "outline-light" : "outline-error"} size="sm" onclick="returnFunction()" disabled={available}>Return</Button> </td>
               <td> <Button variant={available? "outline-success" : "outline-error"} size="sm" onclick="giveFunction()" disabled={!available}>Give</Button> </td>
            </tr>
         )
      })
   }

   render() {
      return (
         <div>
            <div class="container" >
                <div class="row">
                    <div class="col-sm">
                        <div class="card-box bg-blue">
                            <div class="inner">
                                <h3> 13436 </h3>
                                <p> Patient Summary </p>
                            </div>
                            <div class="icon" >
                                <i class="fa fa-patient" aria-hidden="true"></i>
                                <img alt="Patients" class="image"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="card-box bg-green">
                            <div class="inner">
                                <h3> 10/300 </h3>
                                <p> Available/Total </p>
                            </div>
                            <div class="icon">
                                <i class="fa fa-engine" aria-hidden="true"></i>
                                <img alt="Oxygen" class="image"/>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
            <div style={{display:'flex' }}>
            </div>
            <table id='machines'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}

export default Dashboard;