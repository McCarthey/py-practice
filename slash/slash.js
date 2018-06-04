#!/usr/bin/env node

function convert(argv) {
    try {
        argv[0]
        if (argv[0] === '-h' || argv[0] === '--help') {
            console.log('slash can help you to convert back slash "\" to forward slash "/",just enter a string')
        } else if (typeof argv[0] === 'string') {
            // console.log(argv[0])
            let res = argv[0].replace(/\\/g, '/')
            console.log(res)
        } else {
            console.error('I do not konw what you want,please try again')
        }
    } catch (e) {
        console.log('Enter a string please,or type -h for help')
    }
}

convert(process.argv.slice(2))