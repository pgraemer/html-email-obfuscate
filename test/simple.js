var assert          = require('assert');
var EmailObfuscator = require('../index.js');
var obfuse          = new EmailObfuscator;
describe('obfuscate', function() {
    describe('simple mail', function() {
        it('should be obfuscated', function() {
            email.random = function() { return 1 };
            assert.equal(
                email.obfuscate('example@example.com'),
                'example<!-- @ -->&#64;example<B>&#46;</b>com'
            );
        });
        it('should be obfuscated more', function() {
            email.random = function() { return 0.1 };
            assert.equal(
                email.obfuscate('example@example.com'),
                '&#x65&#x78&#x61&#x6d&#x70&#x6c&#x65<!-- @ -->&#64;&#x65&#x78&#x61&#x6d&#x70&#x6c&#x65<B>&#46;</b>&#x63&#x6f&#x6d'
            );
        });
        it('should be obfuscated with all rules', function() {
            email.random = function() { return 0 };
            assert.equal(
                email.obfuscate('example@example.com'),
                '<!-- @ -->&#x65<!-- @ -->&#x78<!-- @ -->&#x61<!-- @ -->&#x6d<!-- @ -->&#x70<!-- @ -->&#x6c<!-- @ -->&#x65<!-- @ --><!-- @ -->&#64;<!-- @ -->&#x65<!-- @ -->&#x78<!-- @ -->&#x61<!-- @ -->&#x6d<!-- @ -->&#x70<!-- @ -->&#x6c<!-- @ -->&#x65<!-- @ --><B>&#46;</b><!-- @ -->&#x63<!-- @ -->&#x6f<!-- @ -->&#x6d'
            );
        });
    });
});
