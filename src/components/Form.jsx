import React from 'react'
import { addDatas, patchPosy } from '../Api/Posts_Api';

export const Form = ({ input, setInput, btn, setBtn, setData, setLoading, data }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => {
            return { ...prev, [name]: value }
        })
        //console.log(input)

    }
    const editPost = async () => {
        setLoading(true)
        try {
            const res = await patchPosy(input.id, input)
            if (res.status === 200) {
                setData((prev) => prev.map((cur) => {
                    if (cur.id === input.id) {
                        return { ...input }
                    } else {
                        return cur
                    }
                }))
                setLoading(false)
                setInput({ title: "", body: "", id: "" })
                setBtn(false)
            } else {
                console.log(res.status)
            }

        } catch (error) {
            console.error(error);
        }


    }
    const addData = async () => {
        setLoading(true)
        const obj = { title: input.title, body: input.body, id: data.length + 1 }

        try {
            const res = await addDatas(obj)

            if (res.status === 201) {
                const { data } = res
                setData((prev) => [
                    ...prev,
                    { title: data.title, body: data.body, id: data.id }
                ])
            } else {
                console.error("Unexpected status:", res.status)
            }
        } catch (error) {
            if (error.response) {
                // Server responded with non-2xx (e.g. 404, 500)
                console.error("API error:", error.response.status, error.response.data)
            } else if (error.request) {
                // Request was made but no response
                console.error("No response received:", error.request)
            } else {
                // Something else
                console.error("Error:", error.message)
            }
        } finally {
            setInput({ title: "", body: "", id: "" })
            setLoading(false)
        }


    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const val = e.nativeEvent.submitter.value
        if (val === "EDIT") {
            editPost()
        } else {

            addData()
        }

    }
    return (
        <form className="form" onSubmit={handleSubmit}>
            <input name="title" value={input.title} onChange={handleChange} type="text" placeholder="Enter title..." />
            <input name="body" type="text" value={input.body} onChange={handleChange} placeholder="Enter body..." />
            {/* {btn ? (<button onClick={()=>editPost} type="submit">EDIT</button>) : (<button type="submit">ADD</button>)} */}
            <button type="submit" value={btn ? "EDIT" : "ADD"}> {btn ? "EDIT" : "ADD"}</button>
        </form>
    )
}
