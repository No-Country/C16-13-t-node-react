import { Route, Routes } from 'react-router-dom';
import { Private, Home } from "../views";
import { NoticePerCategory, NoticeComplete, NoticeCreate, NoticeOptions } from "../components/notice";
import { AdminPerfil } from "../components/admin";
import { Login, Register } from '../auth';
import { ResetPassword } from '../auth/ResetPassword';
import { MockupLogin } from '../auth/Mockup';
import { Footer, Navbar } from '../components';

export const AppRouter = () => {

    return (
        <>
            <Navbar />
            <Routes>
        
                {/* RUTAS PUBLICAS */}
                <Route path="/" element={<Home />} />
                <Route path="/notice" element={<Home />} />
                
                <Route path="/notice/:id" element={<NoticeComplete />} />
                <Route path="/notice/:category" element={<NoticePerCategory />} />

                <Route path="/noticeCreate" element={<NoticeCreate />} />
                <Route path="/noticeOptions" element={<NoticeOptions />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/mockup" element={<MockupLogin />} />

                {/* RUTAS PRIVADAS */}
                <Route path="/admin" element={<Private />}>
                    <Route path="/admin/perfil" element={<AdminPerfil />} />
                </Route>

            </Routes>
            <Footer />
        </>
    )
}