import * as stackoverflow from '../utils/stackoverflow'
import * as indeed from '../utils/indeed'
import * as monster from '../utils/monster'

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
        site: string
        search?: string
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
    }

    const stitchUrl = (request: IURLRequest) => {
        const suffix = request.suffix ? `${request.suffix}` : '.com'
        const prefix = request.prefix ? `${request.prefix}` : 'www.'
        const source = sites[request.site]
        let site = (source.site as string).replace('{prefix}', prefix)
        site = site.replace('{suffix}', suffix) + '?'
        const search = request.search ? `${source.search}${request.search}` : ''
        const include = request.include ? `&${source.include}${request.include}` : ''
        const exclude = request.exclude ? `&${source.exclude}${request.exclude}` : ''
        const location = request.location ? `&${source.location}${request.location}` : ''
        const expMin = request.expMin ? `&${source.expMin}${request.expMin}` : ''
        const expMax = request.expMax ? `&${source.expMax}${request.expMax}` : ''
        const page = request.page ? `&${source.page.replace('{num}', request.page).replace('{dec}', request.page*20)}` : ''

        const url = site + search + include + exclude + location + expMin + expMax + page
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
        suffix: string = '.com'
        prefix: string = 'www.'
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
        let { site, prefix, suffix, xml, noSiteAppend } = config
        let base = (sites[site].base as string).replace('{prefix}', prefix)
        base = (base as string).replace('{suffix}', suffix)

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

                const applicationURL = !!el.getAttribute('href') ? `/viewjob?jk=${el.getAttribute('href').substring(2)}` : null //for indeed
                const companyURL = (company.getElementsByTagName('a')[0] || company).getAttribute('href')
                filtered.push({
                    title: {
                        name: (title.firstElementChild || title).getAttribute('title') || title.textContent,
                        url: (noSiteAppend ? '' : base) + (!!applicationURL ? applicationURL : (title.getElementsByTagName('a')[0] || title).getAttribute('href'))
                    },
                    postedOn: postedOn.textContent,
                    company: {
                        name: (company.firstElementChild || company).getAttribute('title') || company.textContent,
                        url: companyURL ? (noSiteAppend ? '' : base) + companyURL : null
                    },
                    location: location ? location.textContent : '',
                    site: site + suffix
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