import React from 'react';
import image from './imageLink';

class Target extends React.Component {
    reTarget = () => {
        this.props.history.push('/gas')
        fetch("http://localhost:4000/gas",{
            method:'get',
            headers: false
        })
    }
    render(){
        return(
            <div>
                {this.setRedirect()}
                <button onClick={this.reTarget}>Target to</button>
            </div>
        )
    }
}

export default Target;