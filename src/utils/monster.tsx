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

const stitcher = {
    base: 'https://www.monster{suffix}/',
    site: 'https://www.monster{suffix}',
    search: 'q=',
    location: 'where=',
    country: 'fq=countryabbrev_s%3A',
    jobType: 'jt=',
    expMin: 'jt=',
    sort: 'sort=',
    page: 'start={dec}'
}

const filter = {
    container: 'card-content',
    title: 'title',
    postedOn: 'meta',
    location: 'location',
    company: 'company'
}

export {
    stitcher,
    filter
}
