import React, { useState } from 'react'
import { Button } from 'semantic-ui-react';
import { map } from 'lodash';
import { socialData } from '../../../utils';
import { Formulario } from '../../../components/Web/Contact';
import "./Contact.scss"

export function Contact() {
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  return (

    <div className="container">
      <div className="formulario">
        < Formulario onReload={onReload} reload={reload} />
      </div>

      <div className="redes-sociales">
        <span className="red-social-nombre">Redes sociales:</span>
        <ul className="red-social-lista">
          {map(socialData, (social) => (
            <li key={social.type}>
              <Button
                key={social.type}
                as="a"
                target="_blank"
                href={social.link}
                color={social.color}
                icon={social.type}
                className="red-social-boton"
              />
              <span>{social.type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
