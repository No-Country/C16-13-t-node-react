import { Navbar, Footer } from "../components";
import { Route, Routes } from 'react-router-dom';
import { Home } from "../views";
import { NoticePerCategory, NoticeComplete } from "../components/notice";
import { AdminPerfil } from "../components/admin";

export const AppRouter = () => {
    
    return (
        <>
            <Navbar />

            {/*RUTAS PUBLICAS */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Home />} />
                <Route path="/notice" element={<Home />} />
                <Route path="/notice/:id" element={<NoticeComplete />} />
                <Route path="/notice/:category" element={<NoticePerCategory />} />
            </Routes>

            {/*RUTAS PRIVADAS*/}
            <Routes>
                <Route path="/admin/perfil" element={<AdminPerfil />} />
            </Routes>

            <Footer />
        </>
    )
}