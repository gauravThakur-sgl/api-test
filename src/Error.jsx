import { useRouteError } from "react-router-dom"

function Error() {
    const error = useRouteError();
  return (
    <div className="bg-black text-white flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-lg">Oops!</h1>
        <p className="font-sm text-md">Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
        </div>
    </div>
  )
}

export default Error