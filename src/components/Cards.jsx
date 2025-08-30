

export const Cards = ({cur,deletess,edits}) => {
    const {id,title,body}=cur;
    const deletes=(e,val)=>{
        e.preventDefault()
        deletess(val)

    }
    const edit=(e,val)=>{
        e.preventDefault()
        edits(val)

    }
  return (
     <div className="card">
            <h2>{id} Title: {title.substr(0,15)}...</h2>
            <p>
              <b>Body:</b> {body.length > 5 ? body.slice(0.8)+"..." : body}
            </p>
            <div className="buttons">
              <button className="edit" onClick={(e)=>edit(e,cur)}>EDIT</button>
              <button className="delete" onClick={(e)=>deletes(e,id)}>DELETE</button>
            </div>
          </div>
  )
}
