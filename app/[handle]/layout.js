import { notFound } from "next/navigation"

export async function generateMetadata({ params }) {
    const { handle } = await params
    const res = await fetch(`http://localhost:3000/api/your-trees?handle=${handle}`, { caches: "no-store" })
    const data = await res.json()
    
    return {
        title: data.res.rows[0].handle_name + " | Link Pool" || "404-Profile not found | Link Pool",
        description: "desc",
    }
}

const Layout = ({ children }) => {

    return (
        <>{children}</>
    )
}

export default Layout;