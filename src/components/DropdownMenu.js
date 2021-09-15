import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DropdownMenu(props){

    const [supervisors, setSupervisors] = useState([]);

    useEffect(function() {
        axios.get("https://609aae2c0f5a13001721bb02.mockapi.io/lightfeather/managers")
        .then(response => setSupervisors(response.data))
        .then(error => console.log(error))
    }, []);

    const sortingAlgorithm =  function (a, b) { return a.lastName.localeCompare(b.lastName)}

    const supervisorSortedNames = supervisors.sort(sortingAlgorithm);

    const supervisorSortedJurisdiction = supervisorSortedNames.filter(function(supervisor) {
        return isNaN(supervisor.jurisdiction);
    })

    const supervisorSorted = supervisorSortedJurisdiction.sort((a, b) => {return a.jurisdiction.localeCompare(b.jurisdiction)})

    function onChangeSupervisor(e) {
        console.log(e.target.value)
        const selectedSupervisor = e.target.value;
        props.handleSupervisor(selectedSupervisor);
    }

    

    return(
        <select className="form-control col-sm-2" onClick={onChangeSupervisor}>
            <option value="0">--Select a supervisor--</option>
            {
                supervisorSorted.map((supervisor) => 
                <option key={supervisor.id} value={JSON.stringify(supervisor)}>Jurisdiction: {supervisor.jurisdiction} -- {supervisor.lastName}, {supervisor.firstName}</option>
                )
            }
        </select>
    );

} 