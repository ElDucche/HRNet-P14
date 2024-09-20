import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom"
import { useAppDispatch } from "../services/hooks"



const Layout = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch()
  dispatch({type: 'employees/getEmployees'})
  return (
    <main className="p-4 grid gap-4 w-screen place-items-center">
      <div className={navigation.state === 'loading' ?"fixed inset-0 backdrop-blur-sm bg-white/50 w-screen z-50 transition-all" : "opacity-0 fixed inset-0 backdrop-blur-0 hidden"}></div>
      <Outlet />
      <ScrollRestoration />
    </main>
  )
}

export default Layout