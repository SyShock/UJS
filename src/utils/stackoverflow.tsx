// https://stackoverflow.com/jobs?
// q=javascript&
// tl=python&
// td=java+php&
// c=usd&
// ms=Junior&
// mxs=Manager&
// j=permanent%2ccontract&
// sort=i&
// pg=2

const stitcher = {
    base: 'https://stackoverflow.com',
    site: 'https://stackoverflow.com/jobs',
    search: 'q=',
    include: 'tl=',
    exclude: 'td=',
    location: 'l=',
    jobType: 'j=',
    expMin: 'ms=',
    expMax: 'mxs=',
    sort: 'sort=',
    page: 'pg={num}'
}

const filter = {
    container: '-job-summary',
    title: '-title',
    postedOn: '-posted-date',
    company: '-details',
    location: '',
    salary: '-salary',
    visa: '-visa',
    relocation: '-relocation'
}

export {
    stitcher,
    filter
}