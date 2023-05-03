import React, { useState, useEffect } from 'react'
import { Loader, Pagination } from "semantic-ui-react"
import { size, map } from "lodash";
import { CourseItem } from "../CourseItems";
import { Course } from "../../../../api";
import "./ListCourses.scss";

const coursesController = new Course();

export function ListCourses(props) {
    const { reload, onReload } = props;

    const [courses, setCourses] = useState(false);
    const [page, setPage] = useState(1);
    const [paginacion, setPaginacion] = useState();

    useEffect(() => {
        (async () => {
            try {
                const response = await coursesController.getCourses({ page });
                setCourses(response.docs);
                setPaginacion({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total,
                })
            } catch (error) {
                console.error(error);
            }
        })()
    }, [page, reload])

    const changePage = (_, data) => {
        setPage(data.activePage);
    }

    if (!courses) return <Loader active inline="centered" />
    if (size(courses) === 0) return "No hay ningun curso";

    return (
        <div className='list-courses'>
            {map(courses, (course) => (
                <CourseItem
                    key={course._id}
                    course={course}
                    onReload={onReload} />
            ))}

            <div className='list-courses__pagination'>
                <Pagination
                    totalPages={paginacion.pages}
                    defaultActivePage={paginacion.page}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    onPageChange={changePage}
                />
            </div>
        </div>
    )
}
