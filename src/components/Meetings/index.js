import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Meeting from './Meeting'
import client from '../../utils/client.js'

const initialState = {
  name: '',
}

function Meetings() {
  const [meetings, setMeetings] = useState([])
  const [meetingData, setMeetingData] = useState(initialState)
  const { id } = useParams()

  useEffect(async () => {
    const data = await client.get(`/contacts/${id}/meetings`)
    setMeetings(data)
  }, [])

  const handleChange = event => {
    const { name, value } = event.target
    setMeetingData( {...meetingData,[name] : value})
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meetingData)
    }
    const data = await client.post(`/contacts/${id}/meetings`, opts)
    setMeetings(data)
  }


  return (
    <>
      <header>
        <h2>Meetings</h2>
      </header>

      <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h2>Create A Meeting</h2>

        <label htmlFor="name">Meeting Name</label>
        <input id="name" name="name" type="text" required onChange={handleChange} value={meetingData.name}/>

        <div className="actions-section">
          <button className="button blue" type="submit">
            Create
          </button>
        </div>
      </form>

      <ul className="contacts-list">
        {meetings.map(meeting => <Meeting key={meeting.id} data={meeting} meetings={meetings} setMeetings={setMeetings}/>)}
      </ul>
    </>
  )
}

export default Meetings
