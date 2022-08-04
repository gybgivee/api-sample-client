import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import client from '../utils/client.js'

function ContactsView() {
  const [contact, setContact] = useState(false)
  const { id } = useParams()
  useEffect(async () => {
    const data = await client.get(`/contacts/${id}`)
    setContact(data.contact)
  }, [])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName} ({contact.type})</h2>
      <p><a href={contact.linkedin}>LinkedIn</a> | <a href={contact.twitter}>Twitter</a></p>
      <p>email: {contact.email}</p>
      <p>address: {contact.street} {contact.city}</p>
      <Link to={`/contacts/${contact.id}/meetings`}>Meetings</Link>
    </div>
  )
}

export default ContactsView