import React from 'react'
import { Row } from 'react-bootstrap'
import ChessCol from './ChessCol'

export default function ChessRow({row}) {
    let col=[1,2,3,4,5,6,7,8]
    return (
        <Row className='v-row m-0 p-0'>
            {
                col.map((element)=>(
                    <ChessCol col={element} row={row}/>
                ))
            }
        </Row>
    )
}
