import React from 'react'
import { Container } from 'semantic-ui-react';
import "./Banner.scss"

export function Banner() {
    return (
        <div className='banner'>
            <Container >
                <h1>
                    Aprende nuevas <br /> tecnologias web y moviles
                </h1>
                <h2>
                    A través de cursos prácticos, conocidos y actualizados, creados por
                    < br />
                    profesionales con años de experiencia.
                </h2>
            </Container>

            <div className='banner__dark' />
        </div>
    )
}
