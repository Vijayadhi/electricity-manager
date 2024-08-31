import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function TopBarComponet() {
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');
  console.log(token);

  const logout = async () => {
    try {

      const res = await axios.post('http://127.0.0.1:8000/api/logout/',
        {}, {
        headers: {
          'Authorization': `Token ${token}`,  // Include the token in the request headers
          'Content-Type': 'application/json'
        },
      });
      localStorage.removeItem('authToken');
      navigate('/')

      // setUserData(res.data);
      // console.log(userData[0].email);

    }
    catch (error) {
      console.error('Error Loout user:', error);
    }
  }



  return (
    <>
      <nav className="navbar bg-primary" data-bs-theme="dark">
        <h1>
          TNEB-Calculatore
        </h1>
        <div className="nav-options">
          {token ? <ul className="nav nav-tabs">

            <li className="nav-item">

              <Link className="nav-link" aria-current="page" onClick={()=>navigate('/dashboard')}><i className="fa-solid fa-gauge"></i> Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={()=>navigate('/buildings')} ><i className="fa-solid fa-building"></i> Manage Buildings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={()=>navigate('/bills')}><i className="fa-solid fa-file-invoice-dollar"></i> Manage Bills</Link>
            </li>

            <li className="nav-item">
              <a className="nav-link"><i className="fa-solid fa-phone"></i> Contact Us</a>
            </li>
            <li className="nav-item">
            <Link className="nav-link" onClick={()=>navigate('/profile')}><i className="fa-solid fa-user"></i> Profile</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => logout()}><i className="fa-solid fa-right-from-bracket"></i> Logout</a>
            </li>

          </ul> : <ul className="nav nav-tabs">

            <li className="nav-item">
            <Link className="nav-link" aria-current="page" onClick={()=>navigate('/')}><i className="fa-solid fa-house"></i> Home</Link>
              {/* <a className="nav-link" aria-current="page" href="#"><i className="fa-solid fa-house"></i> Home</a> */}
            </li>

            <li className="nav-item">
              <Link className="nav-link" onClick={()=>navigate('/login')}><i className="fa-solid fa-book-tanakh"></i> Get In</Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#"><i className="fa-solid fa-passport"></i> About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link"><i className="fa-solid fa-message"></i> Contact Us</a>
            </li>
          </ul>}

        </div>
      </nav>
    </>
  )
}

export default TopBarComponet