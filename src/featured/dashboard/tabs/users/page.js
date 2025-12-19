import { lazy, Suspense } from "react";
import Modal from "../../components/users/Modal";
import TableSkeleton from "@/components/Skeleton/Table";
import CreatedUser from "../../components/users/CreatedUser";
import './page.css'

const Table = lazy(() => import('../../components/users/Table'));


export default function UsersPage () {

    return (

        <>

            <div className="__wrap_content">
                <Suspense fallback={<TableSkeleton/>} >
                    <Table/>
                </Suspense>
                <CreatedUser/>
            </div>

            <Modal/>

        </>

    )

}