import React, {Component} from "react";
import {Col, Grid, Row} from "react-bootstrap";

export default class Dashboard extends Component {
    render () {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>Process</h2>
                    </Col>
                </Row>
            </Grid>
        )
    }
}