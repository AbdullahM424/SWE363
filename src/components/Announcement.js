import React from 'react'
import { Accordion } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


function Announcement(props) {

  return (
    <div>
         <Accordion.Item eventKey={props.num}>
        <Accordion.Header>{props.announcementsTitle}</Accordion.Header>
        <Accordion.Body>
            {props.announcements}
        </Accordion.Body>
      </Accordion.Item>
    </div>
  )
}

export default Announcement;