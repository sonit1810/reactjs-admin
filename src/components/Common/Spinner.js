import React from 'react';
import  { Spinner } from 'react-bootstrap';

class SpinnerComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        if (props.show ) {
            return (
                <Spinner style={{position: 'absolute', left: '50%', top: '10%'}} animation="border">
                </Spinner>
            ) ;
        } else {
            return ('');
        }
    }
}

export default (SpinnerComponent);
