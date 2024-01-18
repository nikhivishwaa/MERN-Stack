import React, { useState } from 'react'

export default function Signup() {
  const [user, setUser] = useState({ name:"", email: "", password: "", cpassword:""});
  const onchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  return (
    <>
      <form>
        <div class="mb-3">
          <label for="Name" class="form-label">Full Name</label>
          <input type="text" name="name" class="form-control" id="Name" onChange={onchange} required />
        </div>
        <div class="mb-3">
          <label for="Email" class="form-label">Email address</label>
          <input type="email" name="email" class="form-control" id="Email" onChange={onchange} required />
        </div>
        <div class="mb-3">
          <label for="Password" class="form-label">Password</label>
          <input type="password" name="password" class="form-control" onChange={onchange}
            id="Password" required />
        </div>
        <div class="mb-3">
          <label for="cPassword" class="form-label">Confirm Password</label>
          <input type="password" name="cpassword" class="form-control" onChange={onchange}
            id="cPassword" required />
        </div>
        <button type="submit" class="btn btn-primary" disabled={user.email.length < 7 || user.password.length < 8}>Sign Up</button>
      </form>
    </>
  )
}
