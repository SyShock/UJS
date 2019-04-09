// https://www.monster.de/en/search?
// q=javascript&
// rad=20&
// jt=5&
// cy=de

// https://www.monster.com/jobs/search/?q=javascript&stpage=1&page=2

// https://www.monster.co.uk/medley?
// intcid=swoop_worldwide_worldwide_jobs
// &q=Java

// https://www.monster.co.uk/medley?
// intcid=swoop_worldwide_worldwide_jobs
// &q=Java
// &fq=countryabbrev_s%3AUS

// https://www.monster.co.uk/medley?
// q=Java
// &where=New%20York%20City%2C%20New%20York
// &fq=countryabbrev_s%3AUS

// it doesn't matter which site it is <.es, .co.uk>
// what matters is &fq=countryabbrev_s%3AES

// https://www.monster.de/en/search/?
// q=java&
// where=&
// cy=de&
// rad=20
// cy=de

const defaultStitcher = {
    // base: 'https://www.monster{suffix}',
    site: 'https://www.monster.de/en/search',
    search: 'q=',
    location: 'where=',
    // country: 'fq=countryabbrev_s%3A',
    country: 'cy={string}',
    jobType: 'jt=',
    expMin: 'jt=',
    sort: 'sort=',
    page: 'pg={num}'
}

const countryStitcher = {
    'uk': {
        country: 'uk'
    },
    'at': {
        country: 'at'
    },
    'be': {
        country: 'be'
    },
    'cz': {
        country: 'cz'
    },
    'dk': {
        country: 'dk'
    },
    'fr': {
        country: 'fr'
    },
    'de': {
        country: 'de'
    },
    'fi': {
        country: 'fi'
    },
    'ie': {
        country: 'ie'
    },
    'it': {
        country: 'it'
    },
    'lu': {
        country: 'lu'
    },
    'nl': {
        country: 'nl'
    },
    'no': {
        country: 'no'
    },
    'se': {
        country: 'se'
    },
    'es': {
        country: 'es'
    },
    'ch': {
        country: 'ch'
    },

}

const _stitcher = () => {
    let res = {}
    Object.keys(countryStitcher).forEach((key) => {
        const entry = countryStitcher[key]
        res[key] = { ...defaultStitcher }
        res[key].country = defaultStitcher.country
            .replace('{string}', entry.country)
    })
    return { ...res }
}

const stitcher = _stitcher()

const filter = {
    container: 'js_result_container',
    title: 'jobTitle',
    postedOn: 'postedDate',
    location: 'location',
    company: 'company',
    salary: 'metadata'
}

export {
    stitcher,
    filter
}
