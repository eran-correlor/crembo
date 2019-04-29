import React, { Component } from 'react';
import './rides.css';
import { Auth } from '../../Auth/Auth';
import { Link } from "react-router-dom";


class RideDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null
        }
        props.activityDetails.onStart('פרטי הסעה');
    }

    componentDidMount() {
        Auth.authFetch(`/api/rides/${this.props.match.params.id}?filter={"include": [{"children": "requests"}, {"drivers": "requests"}, {"assistants": "requests"}, "branches"]}`).then(response => { return response.clone().json() }).then(res => {
            this.setState({ item: res })
        })
    }

    changeItemDetails = (e) => {
        let x = e.target.value;
        let item = { ...this.state.item };
        switch (e.target.id) {
            case "planned_time":
                item.plannedTime = x;
                this.setState({ item })
                break;
            case "title":
                item.title = x;
                this.setState({ item })
                break;
            default:
                console.log("error in changeItemDetails().")
        }
    }

    chooseAssis = (num) => {
        let assis = null;
        switch (num) {
            case 0:
                assis = <Link to={{ pathname: '/rides/ride-details/' + this.props.match.params.id + '/add/assistants', state: { chooseMode: true } }} >
                    <div className="d-inline-block shadow bold p-2 mb-2  bg-white rounded pr-5 text-right staffCard"> + הוסף מלווה </div>
                </Link>
                break;
            case 1:
                assis = <Link to={{ pathname: '/rides/ride-details/' + this.props.match.params.id + '/add/assistants', state: { chooseMode: true } }} >
                    <div className="d-inline-block shadow bold p-2 mb-2  bg-white rounded pr-5 text-right staffCard">+ הוסף מלווה שני</div>
                </Link>
                break;
            default:
                console.log("more than 2 assistans");
        }
        return assis;
    }


    //renders the children/assistants list
    mapOfstaff = (val) => {
        let card = null;
        switch (val) {
            case "drivers":
                let driver = this.state.item.drivers;
                card =
                    <a href={"tel:" + driver.phone}>
                        <div className="d-inline-block shadow p-2 mb-2  bg-white rounded pr-5 text-right driverCard">
                            <div className="cardTittle">נהג</div>
                            <div className="name">{driver.firstName} {driver.lastName} <i className="fas fa-phone" /> </div>
                        </div>
                    </a>

                break;
            case "assistants":

                card = this.state.item.assistants.map((value, i) => (
                    <a key={i} href={"tel:" + value.phone}>
                        <div  className="d-inline-block shadow p-2 mb-2  bg-white rounded pr-5 text-right driverCard">
                            <div className="cardTittle">מלווה</div>
                            <div className="name">{value.firstName} {value.lastName} <i className="fas fa-phone" /> </div>
                        </div>
                    </a>
                ))

                break;
            default:
                return console.log("error in mapOfstaff()")

        }
        return card;
    }

    render() {
        console.log("this.state", this.state)
        return (
            <div>
                {this.state.item &&
                    <div>
                        <div className="top">
                            <input className="row title" type="text" value={this.state.item.title} name="title" id="title" onChange={this.changeItemDetails}></input>
                            <div className="row unpadding">
                                <div className="col basicDataOnActivity">{this.props.activityDetails.activityDay}</div>
                                <div className="col basicDataOnActivity">{this.props.activityDetails.activityDate}</div>
                                <div className="col basicDataOnActivity">סניף עמק רפאים</div>
                            </div>
                            <div className="timeout">שעת יציאה<input className="timein" type="time" value={this.state.item.plannedTime} name="planned_time" id="planned_time" onChange={this.changeItemDetails}></input></div>
                            {this.state.item.drivers && <div className="driveri">הנהג: {this.state.item.drivers.firstName} {this.state.item.drivers.lastName}</div>}
                        </div>




                        <div>
                            {this.state.item.drivers && <div>{this.mapOfstaff("drivers")}</div>}
                            {this.state.item.assistants && <div>{this.mapOfstaff("assistants")}</div>}

                            {!this.state.item.drivers && <Link to={{ pathname: '/rides/ride-details/' + this.props.match.params.id + '/add/drivers', state: { chooseMode: true } }} >
                                <div className="d-inline-block bold shadow p-2 mb-2  bg-white rounded pr-5 text-right staffCard"> + הוסף נהג </div>
                            </Link>}

                            {this.state.item.assistants && <div>{this.chooseAssis(this.state.item.assistants.length)}</div>}

                            {this.state.item.children && <Link to={{ pathname: '/rides/ride-details/' + this.props.match.params.id + '/map', state: { children: this.state.item.children, assistants: this.state.item.assistants, branches: this.state.item.branches } }} >
                                <div className="d-inline-block bold shadow p-2 mb-2 bg-white rounded text-center staffCard">מסלול ונוסעים</div>
                            </Link>}
                        </div>




                    </div>}
            </div>

        );
    }
}



export default RideDetails;