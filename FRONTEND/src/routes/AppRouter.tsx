import { Navbar, Footer} from "../components";
import { Route, Routes } from 'react-router-dom';
import { Home } from "../views";
export const AppRouter = () => {



    return (
        <>
            <Navbar />
          
            {/*RUTAS PUBLICAS */}
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="*" element={<Home/>}/>
            </Routes>

            {/*RUTAS PRIVADAS*/}
            <Routes>

            
            </Routes>
            <Footer/>
        </>
        


    )
}