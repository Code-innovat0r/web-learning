import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [formarray, setformarray] = useState([])

    useEffect(() => {
        let data = localStorage.getItem("data");
        if (data) {
            setformarray(JSON.parse(data));
        }
    }, [])

    const showPassword = () => {
        let a = document.querySelector('.o_eye').innerHTML
        if (a == "visibility") {
            document.querySelector('.o_eye').innerHTML = "visibility_off"
            document.querySelector('.pass-input').type = "password"
        } else {
            document.querySelector('.o_eye').innerHTML = "visibility"
            document.querySelector('.pass-input').type = "text"
        }
    }

    const savePassword = () => {
        let a = uuidv4()
        setformarray([...formarray, { ...form, id: a }])
        localStorage.setItem("data", JSON.stringify([...formarray, { ...form, id: a }]))
        setform({ site: "", username: "", password: "" })
        toast("New Row Successfully Created!")
    }


    const handler = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const copytext = (text) => {
        navigator.clipboard.writeText(text)
        toast("Copied to the Clipboard!")
    }

    const deleteRow = (id, boolean = true) => {
        if (boolean) {
            let conf = confirm("Are you sure you want to delete ??")
            if (conf) {
                setformarray(formarray.filter(i => i.id !== id))
                localStorage.setItem("data", JSON.stringify(formarray.filter(i => i.id !== id)))
                toast("Row Successfully Deleted!")
            }
        } else {
            confirm("Make sure that you must save After edit... pre-existance is deleted")
            setformarray(formarray.filter(i => i.id !== id))
            localStorage.setItem("data", JSON.stringify(formarray.filter(i => i.id !== id)))
        }
    }

    const editRow = (id) => {
        setform(formarray.filter(i => i.id === id)[0])
        deleteRow(id, false)
    }

    return (
        <>
            <div className="screen bg-pink-100">

                <div className='main-container mx-[18vw] pt-[5vh] flex flex-col items-center'>
                    <div className='text-center my-5'>
                        <strong className='italic text-blue-600 text-[23px]'>&lt; Pass<span className='text-cyan-800'>Man</span> /&gt;</strong>
                        <p>Your Very Own Password Manager</p>
                    </div>
                    <div className='input-area text-gray-500 w-full flex flex-col p-4'>
                        <input type="text" onChange={handler} value={form.site} name='site' className='w-full rounded-3xl py-1 px-3 border-green-500 border-2' placeholder='Enter web Address....' />
                        <div className='flex my-4 gap-4'>
                            <input type="text" onChange={handler} name='username' value={form.username} className='w-[70%] rounded-3xl py-1 px-3 border-green-500 border-2' placeholder='Enter UserName....' />
                            <div className='w-[30%] relative'>
                                <input type="password" onChange={handler} value={form.password} name='password' className='pass-input w-[100%] rounded-3xl py-1 px-3 border-green-500 border-2' placeholder='Enter Password....' />
                                <span onClick={showPassword} className="o_eye material-symbols-outlined absolute top-[6px] right-3 cursor-pointer" >
                                    visibility_off
                                </span>
                            </div>
                        </div>
                    </div>
                    <button disabled={form.site.length < 2 || form.username.length < 3 || form.password.length < 1} onClick={savePassword} className='flex justify-center items-center bg-green-500 disabled:bg-green-200 rounded-full px-4 py-2 border border-green-900 hover:bg-green-400'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>Save PassWord</button>

                    <div className="showpassword w-[100%] h-[55vh]">
                        <h2 className='my-4 font-bold text-xl'>Your PassWords</h2>
                        {formarray.length === 0 && <div> Now data to show </div>}
                        {formarray.length != 0 &&
                            <div className='h-[80%] overflow-y-scroll'>
                                <table className="table-fixed w-full overflow-hidden rounded-lg">
                                    <thead className='bg-green-800 text-white'>
                                        <tr>
                                            <th className='py-2'>Site</th>
                                            <th className='py-2'>Username</th>
                                            <th className='py-2'>Password</th>
                                            <th className='py-2'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-green-100'>
                                        {
                                            formarray.map((item, index) => (
                                                <tr key={index}>
                                                    <td className='py-2 border-2 border-white text-center'>
                                                        <div className='flex items-center justify-between'>
                                                            <a href={item.site} className='w-[70%] overflow-hidden' target='_blank'>{item.site}</a>
                                                            <div className='cursor-pointer' onClick={() => { copytext(item.site) }}>
                                                                <lord-icon
                                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover" >
                                                                </lord-icon>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-2 border-white text-center'>
                                                        <div className='flex items-center justify-between'>
                                                            <span className='w-[70%] overflow-hidden'>{item.username}</span>
                                                            <div className='cursor-pointer' onClick={() => { copytext(item.username) }}>
                                                                <lord-icon
                                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover" >
                                                                </lord-icon>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-2 border-white text-center'>
                                                        <div className='flex items-center justify-between'>
                                                            <span className='w-[70%] overflow-hidden'>{item.password}</span>
                                                            <div className='cursor-pointer' onClick={() => { copytext(item.password) }}>
                                                                <lord-icon
                                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                    trigger="hover" >
                                                                </lord-icon>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border-2 border-white text-center'>
                                                        <span className='cursor-pointer mx-1' onClick={() => { editRow(item.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                                trigger="hover"
                                                                style={{ "width": "25px", "height": "25px" }}>
                                                            </lord-icon>
                                                        </span>
                                                        <span className='cursor-pointer mx-1' onClick={() => { deleteRow(item.id) }}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/skkahier.json"
                                                                trigger="hover"
                                                                style={{ "width": "25px", "height": "25px" }}>
                                                            </lord-icon>
                                                        </span>
                                                    </td>

                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>

                </div>

            </div>
            <ToastContainer />
        </>

    )
}

export default Manager
