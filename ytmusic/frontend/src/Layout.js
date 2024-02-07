import React from 'react';
import { Row } from 'react-bootstrap';
import Aside from './component/Aside';
import Navigation from './component/Navigation';
import Main from './component/Main';
export default function Layout() {
    return (
        <>
            <Navigation />
            <Row className='p-0 m-0'>
                <Aside />
                <Main />
            </Row>
        </>
    );
}
