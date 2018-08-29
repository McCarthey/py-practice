var fs = require('fs'),
    PNG = require('pngjs').PNG;

fs.createReadStream('./img_boy_1@3x.png')
    .pipe(new PNG({}))
    .on('parsed', function() {
        this.pack().pipe(fs.createWriteStream('./img_boy_1@3x_out.png'));
    });