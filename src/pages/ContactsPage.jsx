import React from 'react'

const ContactsPage = () => {
  return (
    <div className='contact-body'>
    
    <h1 className="page-title">Contacts</h1>

    <ul className="contact-list">
        <li className="contact">
            <h2 className="contact-name">Wambuwi</h2>
            <p className="contact-info">Email: email@example.com</p>
            <p className="contact-info">Phone: +250 7890000</p>
        </li>

        <li className="contact">
            <h2 className="contact-name">Ines</h2>
            <p className="contact-info">Email: email@example.com</p>
            <p className="contact-info">Phone: +250 7890000</p>
        </li>

    </ul>

    </div>
  )
}

export default ContactsPage