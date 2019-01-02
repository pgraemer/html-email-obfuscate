'use strict';

function EmailObfuscator() {};


let encodeHex = function(char) {
    return '&#x' + Buffer.from(char, 'utf8').toString('hex');
}

let escapeChar = function(char) {
    if (char === '@') { return '<!-- @ -->&#64;' }
    if (char === '.') { return '<B>&#46;</b>' }
    return this.random('hex') < 0.2 ? encodeHex(char) : char;
};

let wrappers = [
    // comment wrapper
    function(char) {
        return this.random('comment') < 0.5 ? `<!-- @ -->${char}` : `${char}<!-- @ -->`;
    },
    // span wrapper
    function(char) {
        return `<span>${char}</span>`;
    }
];

let wrapChar = function(char) {
    // wrap just arround 10%
    if (this.random('wrap') < 0.1) {
        let i = parseInt(this.random('wrapper'));
        return wrappers[i].call(this, char);
    }
    return char;
};

// inject random function for tests or if you want to use a more random function than Math.random
EmailObfuscator.prototype.random = function() { return Math.random() };
EmailObfuscator.prototype.obfuscate = function(email) {
    var self = this;
    return email.split('').map(function(c) {
        return escapeChar.call(self, c);
    }).map(function(c) {
        return wrapChar.call(self, c);
    }).join('');
};

module.exports = EmailObfuscator;
