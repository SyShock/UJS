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

const defaultStitcher = {
    base: 'https://{prefix}.indeed.{suffix}',
    site: 'https://{prefix}.indeed.{suffix}/jobs',
    search: 'q=',
    location: 'l=',
    jobType: 'jt=',
    expMin: 'jt=',
    sort: 'sort=',
    page: 'start={dec}',

}

const countryStitcher = {
    'ar': {
        prefix: 'ar'
    },
    'au': {
        prefix: 'au'
    },
    'at': {
        prefix: 'at'
    },
    'bh': {
        prefix: 'bh'
    },
    'be': {
        prefix: 'be'
    },
    'br': {
        suffix: 'com.br'
    },
    'ca': {
        prefix: 'ca'
    },
    'cl': {
        suffix: 'cl'
    },
    'cn': {
        prefix: 'cn'
    },
    'co': {
        prefix: 'co'
    },
    'cr': {
        prefix: 'cr'
    },
    'cz': {
        prefix: 'cz'
    },
    'dk': {
        prefix: 'dk'
    },
    'ec': {
        prefix: 'ec'
    },
    'eg': {
        prefix: 'eg'
    },
    'fi': {
        suffix: 'fi'
    },
    'fr': {
        suffix: 'fr'
    },
    'de': {
        prefix: 'de'
    },
    'gr': {
        prefix: 'gr'
    },
    'hk': {
        suffix: 'hk'
    },
    'hu': {
        prefix: 'hu'
    },
    'in': {
        suffix: 'co.in'
    },
    'id': {
        prefix: 'id'
    },
    'ie': {
        prefix: 'ie'
    },
    'il': {
        prefix: 'il'
    },
    'it': {
        prefix: 'it'
    },
    'jp': {
        prefix: 'jp'
    },
    'kw': {
        prefix: 'kw'
    },
    'lu': {
        suffix: 'lu'
    },
    'my': {
        suffix: 'com.my'
    },
    'mx': {
        suffix: 'com.mx'
    },
    'ma': {
        prefix: 'ma'
    },
    'nl': {
        suffix: 'nl'
    },
    'nz': {
        prefix: 'nz'
    },
    'ng': {
        prefix: 'ng'
    },
    'no': {
        prefix: 'no'
    },
    'om': {
        prefix: 'om'
    },
    'pk': {
        suffix: 'com.pk'
    },
    'pa': {
        prefix: 'pa'
    },
    'pe': {
        suffix: 'com.pe'
    },
    'ph': {
        suffix: 'com.ph'
    },
    'pl': {
        prefix: 'pl'
    },
    'pt': {
        suffix: 'pt'
    },
    'qa': {
        prefix: 'qa'
    },
    'ro': {
        prefix: 'ro'
    },
    'ru': {
        prefix: 'ru'
    },
    'sa': {
        prefix: 'sa'
    },
    'sg': {
        suffix: 'com.sg'
    },
    'za': {
        suffix: 'co.za'
    },
    'kr': {
        prefix: 'kr'
    },
    'es': {
        suffix: 'es'
    },
    'se': {
        prefix: 'se'
    },
    'ch': {
        suffix: 'ch'
    },
    'tw': {
        prefix: 'tw'
    },
    'th': {
        prefix: 'th'
    },
    'tr': {
        prefix: 'tr'
    },
    'ua': {
        prefix: 'ua'
    },
    'ae': {
        suffix: 'ae'
    },
    'gb': {
        suffix: 'co.uk'
    },
    'uy': {
        prefix: 'uy'
    },
    've': {
        prefix: 've'
    },
    'vn': {
        prefix: 'vn'
    },
    'us': {
    }
}

const filter = {
    container: 'sponTapItem',
    title: 'jobtitle',
    postedOn: 'date',
    location: 'companyLocation',
    company: 'companyName',
    salary: 'metadata'
}

const _stitcher = () => {
    let res = {}
    Object.keys(countryStitcher).forEach((key) => {
        const entry = countryStitcher[key]
        res[key] = {...defaultStitcher}
        res[key].base = defaultStitcher.base
            .replace('{prefix}', (entry.prefix || 'www'))
            .replace('{suffix}', (entry.suffix || 'com'))
        res[key].site = defaultStitcher.site
            .replace('{prefix}', (entry.prefix || 'www'))
            .replace('{suffix}', (entry.suffix || 'com'))
    })
    return {...res}
}

const stitcher = _stitcher()

export {
    stitcher,
    filter
}
