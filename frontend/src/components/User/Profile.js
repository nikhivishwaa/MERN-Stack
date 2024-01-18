import React from 'react'

export default function Profile() {
    const user = {name:"", email:""}
    const getUser = async()=>{

    }
    return (
        <div class="card" style="width: 18rem;">
            <div class="card-header">
                Featured
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{user.name}</li>
                <li class="list-group-item">{user.email}</li>
                <li class="list-group-item">A third item</li>
            </ul>
        </div>
    )
}
