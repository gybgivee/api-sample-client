import { useState} from "react"
import { useNavigate, useParams } from "react-router-dom";
import client from "../../utils/client"
const Meeting = (props) => {
    const {data,meetings,setMeetings} = props;
    const meetingId = data.id;
    const {id} = useParams();
    const [toggle, setToggle] = useState(true)
    const [name, setName] = useState(data.name)
    const handleToggle = ()=>{
        setToggle(!toggle);
    }
    const handleChange = (e)=>{
        const name = e.target.value;
        setName(name);

    }
    const handleSubmit = async(event)=>{
        console.log('id',id,'data.id',meetingId);

        event.preventDefault()
        const opts = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({...data,['name']:name})
        }
        const data = await client.put(`/contacts/${id}/meetings/${meetingId}`, opts)
       setMeetings(data)
       setToggle(!toggle)
    }
    const handleDelete = async () => {
        const data = await client.delete(`/contacts/${id}/meetings/${meetingId}`, { method: 'DELETE' })
        setMeetings(data)
      }
    return (
        <div className="meeting-group">
            {toggle ? (
                <li className="contact"><p>{data.name}</p></li>
            ) :
                (<>
                    <input
                        type='text'
                        value={name}
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Save</button>
                    </>
                )
            }
            <li onClick={handleToggle}><a>Edit</a></li>
            <li onClick={handleDelete}>Delete</li>
        </div>
    )
}



export default Meeting
