

export default function App() {
  return (
    <main className="p-2">
      <div className="grid res-grid py-24 place-items-center gap-y-20">
        <section className=" grid place-items-center">

          <div className="grid gap-4">

            <div>
              <p className="text-3xl font-extrabold text-yellow-300 text-wrap">Everything you are. In one, simple link in bio.</p>
              <p className="my-2">Join 70M+ people using LinkTree for thier link in bio. One link to help you share everthing you create, curate and sell from your Instagram, Tiktok, Youtube and other social media profiles.</p>
            </div>
            <div className="flex gap-2">
              <input className="rounded-lg p-2 text-black outline-green-200" type="text" placeholder="http://linktr.re/" />
              <button className="rounded-full p-2 text-nowrap bg-purple-800 " type="button" >Claim your link</button>
            </div>

          </div>

        </section>
        <section className=" bg-slate-200">
          <img src="/donuimage.png" alt=""/>
        </section>
      </div>
    </main>
  );
}
