import 'antd/dist/antd.css';
import React from "react";
import {Fragment} from "react";
import { BrowserRouter, Route,Routes} from "react-router-dom";
import loadable from "./utils/loadable";


const Login = loadable(() => import('./views/Login/Login'))
const Error_page=loadable(()=>import('./views/Others/404/404'))
const Index=loadable(()=> import('./views/Index'))
const DefaultLayout=loadable(()=>import('./containers'))

export default function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route path={"/login"} element={<Login/>}/>
                {/*<Route path={"*"} element={<Error_page/>}/>*/}
                <Route path={"/index"} element={<DefaultLayout/>}/>
                <Route path={"*"} element={<DefaultLayout/>}/>
            </Routes>
        </BrowserRouter>
  );
}