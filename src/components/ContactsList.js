import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Spinner from './Spinner'
import client from '../utils/client.js'

function ContactsList({ contacts, setContacts, isLoading }) {
  console.log('contacts', contacts);
  const [searchParams, setSearchParams] = useSearchParams()
  
  
  const handleChange = async (event) => {
    const {value, checked} = event.target
    console.log('searchParams',searchParams);
    const types = searchParams.getAll('type')
    console.log('types',types);
    
    if (checked) types.push(value)
    if (!checked) types.splice(types.indexOf(value), 1)
    setSearchParams({type: types})
    const filteredContacts = await filterByTypes(types)
    setContacts(filteredContacts)
  }

  const filterByTypes = async (types) => {
    const res = await client.get('/contacts')
    const data = res.contacts
    if (types.length === 0) return data
    return data.filter(contact => types.includes(contact.type))
  }

  const handleDelete = async id => {
    await client.delete(`/contacts/${id}`, { method: 'DELETE' })
    const filteredContacts = contacts.filter(contact => contact.id !== id)
    setContacts(filteredContacts)
  }

  return (
    <>
    <header>
      <h2>Contacts</h2>
    </header>

    { isLoading ?
      <Spinner /> :
      <>
        <label className="filter">
          <input name="type" type="checkbox" value="personal"  onChange={handleChange} />
          <span>🍻</span> Personal
        </label>
        <label className="filter">
          <input name="type" type="checkbox" value="work"  onChange={handleChange} />
          <span>💻</span> Work
        </label>
        <ul className="contacts-list">
          {contacts.map(contact => {
            return (
              <li className="contact" key={contact.id}>
                <p>{contact.firstName} {contact.lastName}</p>
                <p>
                  <Link to={`/contacts/${contact.id}`}>View</Link>
                  <Link to={`/contacts/${contact.id}/edit`} state={{contact}}>Edit</Link>
                  <a href="#" onClick={() => handleDelete(contact.id)}>Delete</a>
                </p>
              </li>
            )
          })}
        </ul>
      </>
    }
    </>
  )
}

export default ContactsList
