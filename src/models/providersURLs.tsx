import * as stackoverflow from '../utils/stackoverflow'
import * as indeed from '../utils/indeed'
import * as monster from '../utils/monster'
import ISO from '../utils/countryCode'

// const reverseProxy = `https://cors-anywhere.herokuapp.com/`
const reverseProxy = `https://evening-depths-43509.herokuapp.com/`
const sites = {
    stackoverflow: stackoverflow.stitcher,
    indeed: indeed.stitcher,
    monster: monster.stitcher
}

// get title, description, and post time (optionally: location, company, tech keywords)
const strip = {
    stackoverflow: stackoverflow.filter,
    indeed: indeed.filter,
    monster: monster.filter
}

// consider removing this, it's handled by the reverse-proxy
const setUserAgent = (window, userAgent) => {
    if (window.navigator.userAgent != userAgent) {
        var userAgentProp = { get: function () { return userAgent; } };
        try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
        } catch (e) {
            window.navigator = Object.create(navigator, {
                userAgent: userAgentProp
            });
        }
    }
}
    interface IURLRequest {
        site: string,
        country?: string
        keyword?: string
        include?: string
        exclude?: string
        location?: string
        radius?: string
        expMin?: string
        expMax?: string
        salaryRange?: string
        remote?: boolean
        fullTime?: boolean
        contact?: boolean
        suffix?: string
        prefix?: string
        page?: number
    }

    interface IJob {
        title: { name: string, url: string }
        location?: string
        description?: string
        company: { name: string, url: string }
        postedOn: string
        site: string
        salary: string
    }

    const stitchUrl = (request: IURLRequest) => {
        let source = sites[request.site] 

        let location
        if (request.country && Object.values(source)[0] instanceof Object) {
            source = source[request.country]
            if (!source) return
            location = request.location ? `&${source.location}${request.location}` : ''
        } else {
            // for stackoverflow or sites without a country GET parameter
            location = request.country ? `&${source.location}${ISO.shortHandles[request.country]}+${request.location}` : ''
        }
        if (!source) return
        let site = source.site + '?'
        const search = request.keyword ? `${source.search}${request.keyword}` : ''
        const include = request.include ? `&${source.include}${request.include}` : ''
        const exclude = request.exclude ? `&${source.exclude}${request.exclude}` : ''
        const expMin = request.expMin ? `&${source.expMin}${request.expMin}` : ''
        const expMax = request.expMax ? `&${source.expMax}${request.expMax}` : ''
        const page = request.page ? `&${source.page.replace('{num}', request.page).replace('{dec}', (request.page-1)*20)}` : ''
        const country = source.country && request.country ? `&${source.country}`: '' 
        
        const url = site + search + location + country + include + exclude  + expMin + expMax + page
        return encodeURI(url)
    }

    const request = (url: string): Promise<any> => {
        return fetch(reverseProxy + url, {
            method: 'GET'
        })
    }

    class StripConfig {
        xml: string
        site: string
        country?: string
        noSiteAppend: boolean
    }

    const merge = (target, ...sources) =>
        Object.assign(target, ...sources.map(x =>
            Object.entries(x)
                .filter(([key, value]) => value !== undefined)
                .reduce((obj, [key, value]) => (obj[key] = value, obj), {})
        ))

    const stripDOM = (config: StripConfig) => {
        config = merge(new StripConfig(), config)
        let { site, xml, noSiteAppend, country } = config
        const base = sites[site].base || sites[site][country].base

        const parser = new DOMParser();
        const regex = /<body[^>]*>((.|[\n\r])*)<\/body>/g
        xml = xml.match(regex)[0]
        const xmlDoc = parser.parseFromString(xml, "text/html");
        const elements = xmlDoc.getElementsByClassName(strip[site].container)
        let filtered: Array<IJob> = []
        // this seriously needs to optimized
        for (const i in elements) {
            const el: Element = elements[i]
            try {
                const title = el.getElementsByClassName(strip[site].title)[0]
                const postedOn = el.getElementsByClassName(strip[site].postedOn)[0]
                const company = el.getElementsByClassName(strip[site].company)[0]
                const location = el.getElementsByClassName(strip[site].location)[0]
                const salary = el.getElementsByClassName(strip[site].salary)[0]

                const applicationURL = !!el.getAttribute('href') ? `/viewjob?jk=${el.getAttribute('href').substring(2)}` : null //for indeed
                const companyURL = (company.getElementsByTagName('a')[0] || company).getAttribute('href')
                filtered.push({
                    title: {
                        name: (title.firstElementChild || title).getAttribute('title') || title.textContent.trim(),
                        url: (base || '') + (!!applicationURL ? applicationURL : (title.getElementsByTagName('a')[0] || title).getAttribute('href'))
                    },
                    postedOn: postedOn.textContent,
                    company: {
                        name: (company.firstElementChild || company).getAttribute('title') || company.textContent.trim(),
                        url: companyURL ? (base || '') + companyURL : null
                    },
                    location: location ? location.textContent : '',
                    site: site,
                    salary: salary ? salary.textContent : null

                })
            } catch (e) { console.error(e) }
        }
        return filtered
    }

    export {
        stitchUrl,
        IURLRequest,
        request,
        stripDOM,
        IJob,
        StripConfig
    }