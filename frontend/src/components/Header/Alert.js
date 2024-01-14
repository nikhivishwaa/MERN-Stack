import React from 'react'

export default function Alert(props) {
  return (
    <>
        <div className={`alert alert-${props.type} alert-dismissible py-2 fade ${props.type?"show":"hide"}`} role="alert">
          <strong>{props.type} : </strong> {props.message?props.caps(props.message):null}
        </div>
    </>
  )
}