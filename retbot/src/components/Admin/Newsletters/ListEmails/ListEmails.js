/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { size, map } from "lodash"
import { Loader, Pagination } from "semantic-ui-react"
import { Newsletter } from "../../../../api"
import { useAuth } from "../../../../hooks"
import { EmailItem } from "../EmailItems"
import "./ListEmails.scss"

const newsletterController = new Newsletter();

export function ListEmails() {

    const { accessToken } = useAuth();

    const [emails, setEmails] = useState(null);
    const [paginacion, setPaginacion] = useState(null);
    const [page, setPage] = useState(1);
    const [reload, setReload] = useState(false);

    const onReload = () => setReload((prevState) => !prevState);

    useEffect(() => {
        (async () => {
            try {
                const response = await newsletterController.getEmails(accessToken, page);
                setEmails(response.docs);
                setPaginacion({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total,
                });
            } catch (error) {
                console.error(error);
            }
        })()
    }, [page, reload]);

    const changePage = (_, data) => {
        setPage(data.activePage);
    }

    if (!emails) return <Loader active inline="centered" />
    if (size(emails) === 0) return "No hay emails registrados";

    return (
        <div className='list-emails'>
            {map(emails, (email) => (
                <EmailItem key={email._id} email={email} onReload={onReload} />
            ))}
            <div className='list-emails__pagination'>
                <Pagination
                    totalPages={paginacion.pages}
                    defaultActivePage={paginacion.page}
                    ellipsisItem={false}
                    firstItem={false}
                    lastItem={false}
                    onPageChange={changePage}

                />
            </div>
        </div>
    )
}
