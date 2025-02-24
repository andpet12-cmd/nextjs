"use client";
import classNames from "classnames";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    type: string;
    tag?: string;
}

export const Pagination: FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, type, tag }) => {
    const router = useRouter();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            const basePath = type === "users" ? "/users" : "/recipes";
            const query = tag ? `/tag=${tag}?page=${newPage}` : `?page=${newPage}`;
            router.push(`${basePath}${query}`);
        }
    };

    return (
        <div className="pagination-wrapper">
            <button
                className={classNames("pagination-btn", { disabled: currentPage === 1 })}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                    <button
                        className={classNames("number-page", { active: currentPage === pageNumber })}
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={currentPage === pageNumber}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                className={classNames("pagination-btn", { disabled: currentPage === totalPages })}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};
