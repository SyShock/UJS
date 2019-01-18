// https://www.monster.de/en/search?
// q=javascript&
// rad=20&
// jt=5&
// cy=de

// https://www.monster.com/jobs/search/?q=javascript&stpage=1&page=2

const stitcher = {
    base: 'https://www.monster.com/',
    site: 'https://www.monster.com/jobs/search/',
    search: 'q=',
    location: 'l=',
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
