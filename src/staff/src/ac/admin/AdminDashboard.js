import React from 'react';
import Report3 from "../p-s_head/Statistics";
import Report2 from "../p-c_head/Statistics";
import Report1 from "../p-s_clerk/Report";

class AdminDashboard extends React.Component{

    render() : React.ReactNode {
        return(
            <div style={{height: "100%", overflow: "scroll"}}>
                <Report1/>
                <Report2/>
                <Report3/>
            </div>
        )
    }
}

export default AdminDashboard;