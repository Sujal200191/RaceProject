import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Header from "../screens/Header";
import Footer from "../screens/Footer";
import './index.scss';


const App = () => {
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoaded(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
          {/* <Loader loader={loaded} /> */}
          <div className="App" id={loaded ? "no-scroll" : "scroll"}> {/** id={loaded ? "no-scroll" : "scroll"} */}
            <Header />
            {/* <ScrollToTop /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/about" element={<About />} />
              <Route path="/workex" element={<WorkEx />} />
              <Route path="/resume" element={<Resume />} /> */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </div>
        </>
     );
}

export default App;
