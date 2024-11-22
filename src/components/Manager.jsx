import React, { useState,useEffect } from 'react'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import "../App.css"
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
  const [form, setform] = useState({ site: '', username: '', password: '' });
const [passwordArray, setpasswordArray] = useState([])
const getPass=async () => {
  let req=await fetch("http://localhost:3000/")
  let password=await req.json()
  console.log(password);
  setpasswordArray(password)
}

useEffect(() => {
  getPass()
}, [])
const copyText=(text)=>{
  toast('Copy To Clipboard', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
navigator.clipboard.writeText(text)
}
const savePassword =async (id) => {
  await fetch("http://localhost:3000/",{method:"DELETE",header:{"content-type":"application/json"}, body:JSON.stringify([{id:form.id}])})
  await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Fix header key 'headers' and 'Content-Type'
      body: JSON.stringify(form)  // Send only the form object, not the whole passwordArray
  });
  setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
  setform({ site: '', username: '', password: '' });
  toast('Password Saved Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
  });
};

  const editPass = (id) => {
   setform({...passwordArray.filter(item=>item.id===id)[0],id:id})
   setpasswordArray(passwordArray.filter(item=>item.id!==id))
   
  };
  const deletePass = async(id) => {
   setpasswordArray(passwordArray.filter(item=>item.id!==id))
    let res=await fetch("http://localhost:3000/",{method:"DELETE",header:{"content-type":"application/json"}, body:JSON.stringify({id})})
  //  localStorage.setItem("password",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
   toast('Password Deleted', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  };

  const handelChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
  <>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <div className="mb-8 bg-green-50 min-h-screen px-2 md:px-16 lg:px-32 py-5">
      <div className="text-center mb-5">
        <h1 className="font-bold text-2xl">
          <span className="font-bold text-green-600">&lt;</span>
          <span className="font-bold">Pass</span>
          <span className="text-green-600 font-bold">Op</span>
          <span className="text-green-600 font-bold">&gt;</span>
        </h1>
        <p>Your Own Password Manager</p>
      </div>

      <div className="input space-y-3">
        <input
          value={form.site}
          onChange={handelChange}
          className="w-full rounded-full border border-green-600 px-4 py-2"
          type="text"
          name="site"
          placeholder="Site"
        />
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
          <input
            value={form.username}
            onChange={handelChange}
            className="rounded-full border w-full md:w-1/2 border-green-600 px-4 py-2"
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            value={form.password}
            onChange={handelChange}
            className="px-4 py-2 rounded-full border w-full md:w-1/2 border-green-600"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={savePassword}
          className="flex gap-2 font-bold bg-cyan-400 justify-center items-center rounded-full px-6 py-2 w-full md:w-1/2 mx-auto"
        >
          <lord-icon src="https://cdn.lordicon.com/sbnjyzil.json" trigger="hover"></lord-icon>
          Add Password
        </button>
      </div>

      <div className="password mt-8">
        <h1 className="font-bold text-center text-xl">Your Passwords</h1>
        {passwordArray.length === 0 && <div className="text-center mt-3">No Password Saved Yet</div>}
        {passwordArray.length !== 0 && (
          <table className="table-auto w-full text-center mt-3 overflow-hidden rounded-md">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-1 md:p-3">Site</th>
                <th className="p-1 md:p-3">Username</th>
                <th className="p-1 md:p-3">Password</th>
                <th className="p-1 md:p-3"></th>
              </tr>
            </thead>
            <tbody className="bg-green-200">
              {passwordArray.map((item, index) => (
                <tr key={index}>
                  <td className="p-1 md:p-2">
                    <div className="flex gap-1 md:gap-2 items-center justify-center">
                      {item.site}
                      <svg className="cursor-pointer" onClick={() => copyText(item.site)} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16">
                        <path fill="currentColor" d="M11.4 0a.85.85 0 0 1 .622.273l2.743 3a.88.88 0 0 1 .235.602v9.25a.867.867 0 0 1-.857.875H3.857A.867.867 0 0 1 3 13.125V.875C3 .392 3.384 0 3.857 0zM14 4h-2.6a.4.4 0 0 1-.4-.4V1H4v12h10z" />
                        <path fill="currentColor" d="M3 1H2a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1h-1v1H2V2h1z" />
                      </svg>
                    </div>
                  </td>
                  <td className="p-1 md:p-2">
                    <div className="flex gap-1 md:gap-2 items-center justify-center">
                      {item.username}
                      <svg className="cursor-pointer" onClick={() => copyText(item.username)} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16">
                        <path fill="currentColor" d="M11.4 0a.85.85 0 0 1 .622.273l2.743 3a.88.88 0 0 1 .235.602v9.25a.867.867 0 0 1-.857.875H3.857A.867.867 0 0 1 3 13.125V.875C3 .392 3.384 0 3.857 0zM14 4h-2.6a.4.4 0 0 1-.4-.4V1H4v12h10z" />
                        <path fill="currentColor" d="M3 1H2a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1h-1v1H2V2h1z" />
                      </svg>
                    </div>
                  </td>
                  <td className="p-1 md:p-2">
                    <div className="flex gap-1 md:gap-2 items-center justify-center">
                      {"*".repeat(item.password.length)}
                      <svg className="cursor-pointer" onClick={() => copyText(item.password)} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16">
                        <path fill="currentColor" d="M11.4 0a.85.85 0 0 1 .622.273l2.743 3a.88.88 0 0 1 .235.602v9.25a.867.867 0 0 1-.857.875H3.857A.867.867 0 0 1 3 13.125V.875C3 .392 3.384 0 3.857 0zM14 4h-2.6a.4.4 0 0 1-.4-.4V1H4v12h10z" />
                        <path fill="currentColor" d="M3 1H2a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1h-1v1H2V2h1z" />
                      </svg>
                    </div>
                  </td>
                  <td className="flex gap-0.5 md:gap-2 p-2 justify-center">
                    <svg onClick={() => editPass(item.id)} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512">
                      <path d="M163 439.573l-90.569-90.569L322.78 98.656l90.57 90.569z" fill="currentColor" />
                      <path d="M471.723 88.393l-48.115-48.114c-11.723-11.724-31.558-10.896-44.304 1.85l-45.202 45.203 90.569 90.568 45.202-45.202c12.743-12.746 13.572-32.582 1.85-44.305z" fill="currentColor" />
                      <path d="M64.021 363.252L32 480l116.737-32.021z" fill="currentColor" />
                    </svg>
                    <svg onClick={() => deletePass(item.id)} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/>
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </>
  );
};

export default Manager;
