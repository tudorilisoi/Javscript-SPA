
const MAIN_CONTAINER = document.querySelector('#main')
function replaceMainHTML(htmlString) {
    MAIN_CONTAINER.innerHTML = htmlString
}

const delay = (millis = 300) => {
    let timer
    return new Promise((resolve, reject) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            resolve(true)
        }, millis);
    })
}

// TODO replace with LRU
const fetchCache = {}

const fetchHTML = async function (path) {
    replaceMainHTML('Loading...')
    await delay()
    if (fetchCache[path]) {
        console.log("CACHED", path)
        return fetchCache[path]
    }

    try {
        const result = await fetch(path).then(r => r.text())
        return fetchCache[path] = result
    } catch (error) {
        throw error
    } finally {
        replaceMainHTML('Loaded')
    }

}
const watchesPage = async () => {
    //fetch
    //import
    const tpl = await fetchHTML('./watches.html')
    replaceMainHTML(tpl)
}



const homePage = async () => {

    const tpl = await fetchHTML('./home.html')
    replaceMainHTML(tpl)
    // now you can setup event listeners on #main descendants
    const button = document.querySelector('#main button')
    button.addEventListener('click', ev => {
        console.log(ev.target.dataset)
    })
}

function changeClientRoute(routeStr) {

}

function main() {
    const handleRoute = () => {
        const { hash } = window.location
        console.log('The hash has changed!', hash)
        switch (hash) {
            case '#home':
            case '':
                homePage()
                break;
            case '#watches':
                watchesPage()
                break;
        }
    }
    window.addEventListener('hashchange', handleRoute, false);

    //handle initial route
    handleRoute()
}



main()