import React from 'react';
import { Link } from 'react-router-dom'
import './Toolbar.css'

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <Link to='/admin'>My Admin</Link>
    </div>
  );
}

export default Toolbar;
