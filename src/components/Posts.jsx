import { useEffect, useState } from "react"
import { Form } from "./Form"
import { delete_Posts, get_Posts } from "../Api/Posts_Api"
import { Cards } from "./Cards"

export const Posts = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    title: "",
    body: "",
    id: ""
  })
  const [btn, setBtn] = useState(false)
  const get_Post = async () => {
    const res = await get_Posts()
    res.status === 200 ? setData(res.data) : []
  }
  const deletess = async (val) => {
    setLoading(true)
    const res = await delete_Posts()
    if (res.status === 200) {

      const filterData = data.filter((cur) => cur.id !== val)
      //console.log(filterData)
      setData(filterData)
      setLoading(false)



    }
  }
  const edits = async (val) => {
    //console.log(val)
    setInput({ title: val.title, body: val.body, id: val.id })
    setBtn(true)
  }
  useEffect(() => {
    get_Post()
  }, [])

  return (
    <>
      <div className="app">

        {/* 🔹 Form Section */}
        <Form data={data} input={input} btn={btn} setBtn={setBtn} setInput={setInput} setData={setData} setLoading={setLoading}></Form>

        {/* 🔹 Posts Grid */}

        {!data || loading ? (<div className="cn"><span className="loader"></span></div>) : (
          <div className="grid">
            {data.map((cur) => (
              <Cards deletess={deletess} edits={edits} key={cur.id} cur={cur}></Cards>
            ))}
          </div>
        )}





      </div>
    </>
  )
}