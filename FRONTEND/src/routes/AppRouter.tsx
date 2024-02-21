import { Route, Routes } from 'react-router-dom';
import { Private, Home } from "../views";
import { NoticePerCategory, NoticeComplete } from "../components/notice";
import { AdminPerfil } from "../components/admin";
import { Login, Register } from '../auth';

export const AppRouter = () => {
    
    return (
        <>

            {/*RUTAS PUBLICAS */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Home />} />
                <Route path="/notice" element={<Home />} />
                <Route path="/notice/:id" element={<NoticeComplete />} />
                <Route path="/notice/:category" element={<NoticePerCategory />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

            {/*RUTAS PRIVADAS*/}
            <Routes>
                <Route path="/admin" element={<Private />} />
                <Route path="/admin/*" element={<Private />} />
                <Route path="/admin/perfil" element={<AdminPerfil />} />
            </Routes>

        </>
    )
}