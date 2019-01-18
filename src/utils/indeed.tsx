// advanced
// https://www.indeed.com/jobs?
// as_and=javascript&
// as_phr=&
// as_any=&
// as_not=&
// as_ttl=&
// as_cmp=&
// jt=fulltime&
// st=&
// as_src=&
// salary=%2440k-%2490k&
// radius=25&
// l=New+York&
// fromage=any&
// limit=10&
// sort=&ps
// f=advsrch

// simple
// https://www.indeed.com/jobs?
// q=javascript+<salary $90k>&
// l=Chicago%2C+IL&
// jt=contact&
// explvl=mid_level

const stitcher = {
    base: 'https://{prefix}indeed{suffix}',
    site: 'https://{prefix}indeed{suffix}/jobs',
    search: 'q=',
    location: 'l=',
    jobType: 'jt=',
    expMin: 'jt=',
    sort: 'sort=',
    page: 'start={dec}'
}

const filter = {
    container: 'sponTapItem',
    title: 'jobtitle',
    postedOn: 'date',
    location: 'companyLocation',
    company: 'companyName'
}

export {
    stitcher,
    filter
}
