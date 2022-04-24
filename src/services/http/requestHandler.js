import client from './apolloClient'

export default async function (gqlquery, options) {
    const query = {
        query: gqlquery
    }

    if (options && options.variables)
        query.variables = options.variables

    try {
        const { data } = await client.query(query)
        return data
    }
    catch (ex) {
        return { error: ex }
    }
}