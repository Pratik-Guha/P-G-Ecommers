import Footer from "../components/Footer";
import Header from "../components/Header";
import ThemeToggleButton from "../toggle";

export default function Layout({ children }) {

    return  (
        <main>
            <Header/>
            <ThemeToggleButton/>
            {children}
            <Footer/>
        </main>
    )
}