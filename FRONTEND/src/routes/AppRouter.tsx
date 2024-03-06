import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Private, Home } from "../views";
import { NoticeComplete, NoticeCreate, NoticeOptions } from "../components/notice";
import { AdminPerfil } from "../components/admin";
import { Login, Register, ResetPassword } from '../auth';
import { Footer, Navbar } from '../components';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

export const AppRouter = () => {

    const { user } = useContext(UserContext);
    console.log(user)

    const { rol } = user;
    return (
        <>
            <Navbar />
            <Routes>

                {/* RUTAS PUBLICAS */}
                <Route path="/" element={<Home />} />
                <Route path="/notice" element={<Home />} />

                <Route path="/notice/:id" element={<NoticeComplete />} />
                <Route path="/notice/category/:category" element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />



            </Routes>

            {
                (rol === "administrator") &&
                <Routes>
                    {/* RUTAS PRIVADAS */}

                    <Route path="/noticeCreate" element={<NoticeCreate />} />
                    <Route path="/noticeOptions" element={<NoticeOptions />} />


                    <Route path="/admin" element={<Private />}>
                        <Route path="/admin/perfil" element={<AdminPerfil />} />
                    </Route>

                </Routes>
            }



            <Footer />
        </>
    )
}