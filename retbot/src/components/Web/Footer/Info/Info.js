import React from 'react'
import { Button } from 'semantic-ui-react';
import { map } from 'lodash';
import { image } from '../../../../assets';
import { socialData } from '../../../../utils';
import "./Info.scss"

export function Info() {
    return (
        <div className='footer-info'>
            <img src={image.IconPng} alt="Icon" className='logo' />
            <p>
                Adéntrate en el emocionante mundo del desarrollo web y descubre un universo
                de posibilidades para crear proyectos de todo tipo. Aquí, tendrás la libertad
                de dejar fluir tu imaginación y desarrollar verdaderas maravillas con tus habilidades
                y conocimientos en programación y diseño web.
            </p>

            {map(socialData, (social) => (
                <Button
                    key={social.type}
                    as="a"
                    target="_blank"
                    herf={social.link}
                    color={social.type}
                    icon={social.type}
                />
            ))}

        </div>
    )
}
