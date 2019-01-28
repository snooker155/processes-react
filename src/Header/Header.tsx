import React, {Component} from "react";
import {Nav, Navbar, NavItem} from 'react-bootstrap';

export default class Header extends Component {
    render () {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href='#'>React Processes</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {/*<NavItem eventKey={1} href="#">*/}
                        {/*Link*/}
                    {/*</NavItem>*/}
                    {/*<NavItem eventKey={2} href="#">*/}
                        {/*Link*/}
                    {/*</NavItem>*/}
                </Nav>
            </Navbar>
        )
    }
}