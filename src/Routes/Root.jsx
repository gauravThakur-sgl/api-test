import { Link, Outlet,  } from "react-router-dom"

function Root() {
  return (
    <>
      <div className="bg-[#023D54] flex justify-center items-center">
        <ul className="flex font-bold text-lg gap-2 m-2 text-white">
          <li className="p-2">
            <Link to={"/"} >Home</Link>
          </li>
          <li className=" p-2">
            <Link to={"fetch"}>Fetch</Link>
          </li>
          <li className="p-2">
            <Link to={"axios"}>Axios</Link>
          </li>
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Root