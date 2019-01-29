import React, {Component} from "react";
import {Col, Grid, Row} from "react-bootstrap";
import {GraphView} from "../GraphView";

export default class Dashboard extends Component {
    render () {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>Process</h2>

                        <GraphView/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}