import React from 'react'
import { Grid, GridColumn, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./Menu.scss";

export function Menu() {
    return (
        <div className='footer-menu'>
            <h4>Navegacion</h4>

            <Grid columns={2}>
                <Grid.Column>
                    <Link to="#" >
                        <Icon name='book' />Cursos online
                    </Link>
                    <Link to="#" >
                        <Icon name='code' />Desarollo web
                    </Link>
                    <Link to="#" >
                        <Icon name='database' />Base de datos
                    </Link>
                    <Link to="#" >
                        <Icon name='code' />UI/UX
                    </Link>
                </Grid.Column>
                <GridColumn>
                    <Link to="#" >
                        <Icon name='server' />sistemas / servidores
                    </Link>
                    <Link to="#" >
                        <Icon name='cogs' /> CMS
                    </Link>
                    <Link to="#" >
                        <Icon name='user outline' /> Porfolio
                    </Link>
                    <Link to="#" >
                        <Icon name='python' /> Backend
                    </Link>

                </GridColumn>
            </Grid>
        </div>
    )
}
