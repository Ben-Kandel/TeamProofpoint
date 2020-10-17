import React, {Component} from "react";
import {Card} from "react-bootstrap";

class InfoCard extends Component{
    render(){
        return(
            <div class="grid-item">
                <Card className="text-center" style={{width: this.props.width, height: this.props.height}}>
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