class PaginationHelper {
    paginateResult(data) {
        return {
            data: data.data,
            last_page: Number(data.lastPage),
            current_page: Number(data.page),
            total: Number(data.total),
            per_page: Number(data.perPage)
        };
    };
}

module.exports = PaginationHelper;
