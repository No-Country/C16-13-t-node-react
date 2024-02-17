import { Navbar, Footer } from "../components";
import { Route, Routes } from 'react-router-dom';
import { Home } from "../views";
import NoticeList from "../components/notice/NoticeList";
import NoticeComplete from "../components/notice/NoticeComplete";

export const AppRouter = () => {
    return (
        <>
            <Navbar />

            {/*RUTAS PUBLICAS */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
            </Routes>

            {/*RUTAS PRIVADAS*/}
            <Routes>
            </Routes>

            <Routes>
                <Route path="/" element={<NoticeList />} />
                <Route path="/notice/:id" element={<NoticeComplete />} />
            </Routes>

            <Footer />
        </>
    )
}