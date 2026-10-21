import { Link } from 'react-router'

function Navbar({ user, handleLogout }) {
  return (
    <nav>
      {/* Links everyone will see */}
      <Link to='/'>Homepage</Link>
      {user 
      // Links ONLY logged in users will see
      ? 
      (<>
        <Link to='/public-entries'>All Entries</Link>
        <Link to='/dashboard'>Dashboard</Link>
      <button onClick={handleLogout}>Sign Out</button>
      </>) : 
      (<>
      {/* Links ONLY logged out users will see */}
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/sign-in'>Sign In</Link>
      </>)}
    </nav>
  )
}

export default Navbar