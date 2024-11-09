import React from 'react'
import { Accordion } from 'react-bootstrap'

function Announcement(props) {
import('bootstrap/dist/css/bootstrap.min.css');

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