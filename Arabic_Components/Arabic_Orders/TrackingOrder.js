import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, StepContent } from "@material-ui/core";

import { fetchTrackingOrder } from "../../actions/trackingOrderAction";
import { connect } from "react-redux";
import _ from "lodash";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    }
}));




function TrackingOrder(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0)
    const [open, setOpen] = useState(false);

    // const handleClose = () => {
    //     setOpen(false);
    //     // props.getBack(open);
    // };

    const current_status = _.get(props.trackingOrder.order_details, 'status');  

    var getStatus = _.map(props.trackingOrder.track_data_status || [], (status => {
        return status.status;
    }));


    const checkStatus = (status) => {
        return status === current_status;
    }

    useEffect(() => {
        // props.fetchTrackingOrder(localStorage.getItem("user_token"), props.ID);
        // setOpen(props.open);
        // setActiveStep(getStatus.findIndex(checkStatus));

        props.fetchTrackingOrder(localStorage.getItem("user_token"), props.ID);
        setActiveStep(getStatus.findIndex(checkStatus));
    }, []);

    console.log(props.trackingOrder);

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {_.map(props.trackingOrder.track_data_status || [], ((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label.status.toUpperCase()} </StepLabel>
                        <p style={{fontSize:'12px'}}>{label.date.slice(0,10)}</p>
                    </Step>
                )))}
            </Stepper>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        trackingOrder: state.trackingOrder.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrackingOrder: (token, id) => dispatch(fetchTrackingOrder(token, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingOrder);


