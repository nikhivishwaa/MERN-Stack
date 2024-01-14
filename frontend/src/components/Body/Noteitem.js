import React from 'react'

export default function Noteitem(props) {
    const { note } = props;
    return (
        <div class="card my-2 mx-2">
            <div class="card-header">
                {note.tag}
            </div>
            <div class="card-body">
                <h5 class="card-title">{note.title}</h5>
                <p class="card-text">{note.description}</p>
                <a href="#" class="btn btn-sm btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}
