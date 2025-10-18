"use client"
import Handle from "@/components/Handle"

const YourTrees = () => {


    return (
        <section className="py-32 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-black px-2">
            <div className="grid gap-2 max-w-4xl m-auto">
                <h1 className="text-3xl font-semibold">Your Handles</h1>
                <Handle />
            </div>


        </section>
    )
}

export default YourTrees