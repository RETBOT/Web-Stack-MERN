import React, { useState, useEffect } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { map } from 'lodash';
import { image } from '../../../assets';
import { Menu } from "../../../api"
import { socialData } from '../../../utils';
import "./TopBar.scss"

const menuController = new Menu();

export function TopBar() {
    const [menu, setMenu] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await menuController.getMenu(true);
                setMenu(response);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className='top-bar'>
            <Container>
                <div className='top-bar__left'>
                    <Link to="/" className='logo'>
                        <img src={image.IconPng} alt="Icon" />
                    </Link>
                    <div className='menu'>
                        {map(menu, (item) => (
                            <a key={item._id} href={item.path}>{item.title}</a>
                        ))}

                    </div>
                </div>
                <div>
                    {map(socialData, (social) => (
                        <Button key={social.type}
                            as="a"
                            target="_blank"
                            href={social.link}
                            color={social.type}
                            icon={social.type} />
                    ))}

                    <Button
                        key="login"
                        as="a"
                        target="_blank"
                        href={`${ENV.BASE_PATH_PAGWEB}#/admin`}
                        primary
                        icon="sign in"
                    />
                </div>
            </Container>
        </div>
    )
}
