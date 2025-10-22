import { auth, currentUser } from "@clerk/nextjs/server"


const Contact = async () => {

    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        return <>sign in to view this page</>
    }

    const user = await currentUser()

console.log(user);

    return (
        <>
            <div className="mt-40">welcome , {user.firstName}{user.id}!</div>

            I am contact
        </>
    )
}

export default Contact;