const getItemsCount = items => {
    const totalCount = items.reduce((total, item) => {
        total += item.count
        return total
    }, 0)

    return totalCount
}

export default getItemsCount 