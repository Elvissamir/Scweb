const isSameItem = (itema, itemb) => {
    if (itema.id !== itemb.id)
        return false
    
    for (let attribute in itema.options) {
        if (!itemb.options[attribute] || itema.options[attribute] !== itemb.options[attribute]) {
            return false
        }
    }

    return true
}

export default isSameItem