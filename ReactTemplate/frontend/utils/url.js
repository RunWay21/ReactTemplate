import queryString from 'query-string';

export default {
    getUrl(location) {
        return {
            pathname: location.pathname,
            query: queryString.parse(location.search, { arrayFormat: 'bracket' })
        };
    },

    getLocation(url) {
        return {
            pathname: url.pathname,
            search: '?' + queryString.stringify(url.query, { arrayFormat: 'bracket' })
        };
    }
}