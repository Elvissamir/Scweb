import client from './apolloClient'

export default async function (gqlquery, options) {
    const query = {
        gqlquery
    }

    if (options && options.variables)
        query.variables = options.variables

    try {
        const result = await client.query(query)
        return result
    }
    catch (ex) {
        return { error: ex }
    }
}