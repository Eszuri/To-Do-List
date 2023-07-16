import faunadb, { query as q } from 'faunadb';

const client = new faunadb.Client({
    secret: import.meta.env.VITE_SECRET
});
function Input() {
    const createDoc = async () => {
        try {
            const response = await client.query(
                q.Create(q.Collection("ToDo"), { data: { nama: document.getElementById("form").value } })
            );
            alert("Berhasil Menambahkan");
            document.getElementById("form").value = "";
            window.location.reload();
        } catch (error) {
            alert(error.message)
        }
    };
    return (
        <>
            {/* bagian input */}
            <section className="bg-green-700 w-[90%] mr-auto ml-auto h-screen rounded-xl mt-10">
                <div className="w-full flex justify-center">
                    <h1 className="inline-block text-3xl font-semibold border-b-2 text-white">TODOLIST</h1>
                </div>
                <div className="flex justify-center">
                    <input
                        type="text"
                        id="form"
                        className="focus:bg-slate-300 w-[80%] mt-10 rounded-md outline-teal-400 border-2 placeholder:text-sky-500 font-semibold placeholder:opacity-80 placeholder:text-center placeholder:uppercase h-10 focus:text-slate-800 text-black"
                        placeholder="masukan daftar"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="biruNavigasi rounded w-[50%] mt-2 h-10 text-xl font-medium active:bg-blue-600 text-white"
                        onClick={createDoc}>
                        KIRIM
                    </button>
                </div>
                <hr className="mt-2 mb-10 border-yellow-300" />
                <div id="to" className="text-white text-xl"></div>
                <h1 className="text-white text-xl">Gw Tunda dulu ni Project </h1>
                <h1 className="text-white text-xl">Kesulitan: Menghapus dari Database </h1>
                <h1 className="text-white text-xl">Saat InI : 16-07-2023</h1>
            </section>
            {/*End*/}
        </>
    )
}

export default Input