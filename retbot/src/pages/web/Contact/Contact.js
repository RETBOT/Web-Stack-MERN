import React from 'react'
import { Button } from 'semantic-ui-react';
import { map } from 'lodash';
import { socialData } from '../../../utils'
import "./Contact.scss"

export function Contact() {
  return (
    <div class="redes-sociales">
      <div className='red-social'>
        <span class="red-social-nombre">Contacto: </span>
      </div>
      {map(socialData, (social) => (
        <div className='red-social'>
          <span class="red-social-nombre">{social.type}</span>
          <Button
            className='red-social-icono'
            key={social.type}
            as="a"
            target="_blank"
            href={social.link}
            color={social.type}
            icon={social.type} />
        </div>
      ))}

    </div>
  )
}
