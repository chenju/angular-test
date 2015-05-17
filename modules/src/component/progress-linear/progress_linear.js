if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var MdProgressLinear = (function () {
    function MdProgressLinear() {
    }
    MdProgressLinear.prototype.onChange = function (_) {
    };
    MdProgressLinear.prototype.transformForValue = function (value) {
    };
    MdProgressLinear = __decorate([
        angular2_1.Component({
            selector: 'loading-progress',
            properties: {
                'value': 'value',
                'bufferValue': 'buffer-value'
            },
            hostProperties: {
                'role': 'attr.role',
                'ariaValuemin': 'attr.aria-valuemin',
                'ariaValuemax': 'attr.aria-valuemax',
                'value': 'attr.aria-valuenow'
            }
        }),
        angular2_1.View({
            template: "<div class=\"loading_wrp\">\n            <div class=\"loading\">\n                <div class=\"loading_bar\"></div>\n            </div>\n            <b id=\"loading_text\">0%</b>\n        </div>",
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], MdProgressLinear);
    return MdProgressLinear;
})();
exports.MdProgressLinear = MdProgressLinear;
var Mode = {
    'DETERMINATE': 'determinate',
    'INDETERMINATE': 'indeterminate',
    'BUFFER': 'buffer',
    'QUERY': 'query'
};
