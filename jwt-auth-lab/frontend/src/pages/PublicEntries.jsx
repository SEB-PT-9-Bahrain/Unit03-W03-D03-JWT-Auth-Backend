import { getAllPublicEntries } from "../services/entryService"
import { useState, useEffect } from "react"

function PublicEntries() {
  const [ entries, setEntries ] = useState([])

  async function getEntries(){
    const response = await getAllPublicEntries()
    setEntries(response)
  }
  
  useEffect(()=>{
    getEntries()
  },[])



  return (
    <div>
        <h1>Public Entries</h1>
        {entries.map((oneEntry)=>
        <div>
            <h2>Title: {oneEntry.title}</h2>
        </div>
        )}
    </div>
  )
}

export default PublicEntries