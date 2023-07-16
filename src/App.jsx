import "./style.css"
import Input from './components/Input';
import faunadb, { query as q } from 'faunadb';
import { useEffect } from "react";

document.body.style.backgroundColor = "rgb(75, 73, 73)"; //Bg Body
const client = new faunadb.Client({
  secret: import.meta.env.VITE_SECRET
});
export default function App() {
  useEffect(() => {
    const getCollection = async () => {
      try {
        const response = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection('ToDo'))),
            q.Lambda((x) => q.Get(x))
          )
        );
        // Show on
        const counter = document.querySelector("#to");
        const todos = response.data.map((item) => item.data); // Mengambil data dari setiap dokumen
        // counter.textContent = todos.map((todo) => JSON.stringify(todo)).join('\n');//.replace(/[a-zA-Z{}:'"]/g, "");
        const container = document.createElement("div"); // Membuat div container baru

        todos.forEach((todo) => {
          const todoElement = document.createElement("p");
          todoElement.style.marginLeft = "10px";
          todoElement.style.marginRight = "10px";
          todoElement.style.marginBottom = "10px";
          todoElement.style.backgroundColor = "rgb(154, 165, 0)";
          todoElement.style.borderRadius = "5px";
          todoElement.style.padding = "5px";
          todoElement.textContent = JSON.stringify(todo).replace(/[a-zA-Z{}:'"]/g, "");;
          container.appendChild(todoElement); // Menambahkan elemen todo ke dalam container
        });
        // Membersihkan document.body sebelum menambahkan container
        counter.innerHTML = "";
        counter.appendChild(container);
        // End
      } catch (error) {
        console.log('Error:', error);
      }
    }; // End
    getCollection();
  }, []);
  return (
    <>
      <Input />
    </>
  )
}
