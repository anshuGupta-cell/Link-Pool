import Link from "next/link"

const Navbar = () => {

    return (
        <div className="nav-bar flex">
            <div className="nav-item">
                <Link href="/">
                    BitLinks
                </Link>
            </div>
            <div className="nav-item">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/shorten">Shorten</Link>
                <Link href="/contact-us">Contact Us</Link>
                <Link href="/try-now">Try Now</Link>
                <Link href="/Github">Github</Link>
                <Link href="/Github">Github</Link>
            </div>
        </div>
    )
}

export default Navbar
