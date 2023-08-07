import React, { useState } from 'react';
import './signin.scss'

function SignIn() {
  const [signIn, setSigIn] = useState(true);
  let signInBtn = `toggle-btn ${signIn ? ' active' : ''}`
  let logInBtn = `toggle-btn ${!signIn ? ' active' : ''}`
  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <ul className='tab-group'>
            <li className={signInBtn} onClick={() => { setSigIn(true) }}><a>Sign Up</a></li>
            <li className={logInBtn} onClick={() => { setSigIn(false) }}><a> Log In</a></li>
          </ul>
        </div>
        {
          signIn ? (

        <div className="signin">

          <form action="/" method="post">

            <div className="top-row">
              <div className="field-wrap">
                <label>
                  First Name<span class="req">*</span>
                </label>
                <input type="text" required autocomplete="off" />
              </div>

              <div className="field-wrap">
                <label>
                  Last Name<span class="req">*</span>
                </label>
                <input type="text" required autocomplete="off" />
              </div>
            </div>

            <div className="field-wrap">
              <label>
                Email Address<span class="req">*</span>
              </label>
              <input type="email" required autocomplete="off" />
            </div>

            <div className="field-wrap">
              <label>
                Set A Password<span className="req">*</span>
              </label>
              <input type="password" required autocomplete="off" />
            </div>
            {/* 
          <button type="submit" className="button button-block" />Get Started </button> */}
          </form>
        </div>
          ): (

        <div className='login'>
          <form action="/" method="post">

            <div className="field-wrap">
              <label>
                Email Address<span className="req">*</span>
              </label>
              <input type="email" required autocomplete="off" />
            </div>

            <div class="field-wrap">
              <label>
                Password<span className="req">*</span>
              </label>
              <input type="password" required autocomplete="off" />
            </div>

            <p className="forgot"><a href="#">Forgot Password?</a></p>

            {/* <button class="button button-block"/>Log In</button> */}

          </form>
        </div>
          )
        }

      </div>
    </div >

  );
}

export default SignIn;