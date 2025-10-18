"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function App() {
  const [handle, setHandle] = useState("")
  const router = useRouter()

  const createTree = (e) => {
    e.preventDefault()
    router.push(`/generate?handle=${handle}`)
  }

  return (
    <main className="px-2 bg-green-800">
      <div className="grid res-grid py-36 place-items-center gap-y-20 p-[-5rem] ">
        <section className=" grid place-items-center ">

          <div className="grid gap-4">

            <div>
              <p className="text-5xl font-extrabold text-yellow-300 text-wrap">Everything you are. In one, simple link in bio.</p>
              <p className="my-2">Join 70M+ people using LinkTree for thier link in bio. One link to help you share everthing you create, curate and sell from your Instagram, Tiktok, Youtube and other social media profiles.</p>
            </div>
            <form className="grid res-grid-180 gap-2" onSubmit={(e)=>createTree(e)}>
              <input className="rounded-lg p-3 bg-slate-200 text-black outline-offset-[-.3rem] outline-green-200" type="text" onChange={(e)=>{setHandle(e.target.value)}} placeholder="Enter your handle" required/>
              <button type="submit" className="rounded-full p-3 text-nowrap bg-purple-800 w-fit" >Claim your link</button>
              
            </form>

          </div>

        </section>
        <section className=" bg-slate-200">
          <img src="/donut image.png" alt=""/>
        </section>
      </div>
    </main>
  );
}
