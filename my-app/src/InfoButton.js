import React, {Component} from "react";
import {Button} from "react-bootstrap";

class InfoButton extends Component{
    render(){
        return(
            <div class="grid-button">
                <Button>
                    {this.props.text}
                </Button>
            </div>
        );
    }
}

export default InfoButton;