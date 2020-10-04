import React, {Component} from "react";
import {Card} from "react-bootstrap";

class InfoCard extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="grid-item">
                <Card className="text-center" style={{width: this.props.width}}>
                    <div class="grid-item-header">
                        <Card.Header>
                            {this.props.title}
                        </Card.Header>
                    </div>
                    <Card.Body>
                        <Card.Text>{this.props.text}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default InfoCard;