import { Navigate, Outlet } from "react-router-dom"

export default function Middleware() {
  const data = window.localStorage.getItem("user")
  if (data == null) {
    return <Navigate to="/" />
  } else {
    return <Outlet />
  }
}
