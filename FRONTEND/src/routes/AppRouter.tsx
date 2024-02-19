import { Navbar, Footer } from "../components";
import { Route, Routes } from 'react-router-dom';
import { Home } from "../views";
import {NoticeComplete} from "../components/notice/NoticeComplete";

export const AppRouter = () => {
    return (
        <>
            <Navbar />

            {/*RUTAS PUBLICAS */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Home />} />
                <Route path="/notice/:id" element={<NoticeComplete />} />
            </Routes>

            {/*RUTAS PRIVADAS*/}
    
            <Routes>
            </Routes>

            <Footer />
        </>
    )
}