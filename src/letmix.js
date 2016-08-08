/**(DEVIXAR)*
 *  Letmix Plugin v0.1.0
 *  https://github.com/Cyber-host/letmix.git
 *
 *  (c) 2016 Cyber Host, DEVIXAR http://devixar.com
 *  Developer: https://ua.linkedin.com/in/mikhail-didyk-25b28575
 *  Designer: https://ua.linkedin.com/in/agostos/en
 *  Skype: Cyber-host
 *
 *  MIT licensed
 *  Date: 2016-07-12T21:44Z
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); // AMD
    }
    else if (typeof exports === 'object') {
        module.exports = factory; // CommonJS
    }
    else {
        factory(window.jQuery); // Global
    }
}(function ($) {

    /**
    * ENUM char codes
    */
    var eChar = {
        SPACE: 32,
        NEW_ROW: 10,
    };

    /**
    * Clear inner of element
    *
    * @param {HTMLElement} element
    * @return {Void}
    */
    var clearElement = function(element) {
        element.text('');
    }

    /**
    * Check char in space & other symbols
    *
    * @param {Char} char
    * @return {Boolean}
    */
    var isBadChar = function(char) {
        return $.inArray(char.charCodeAt(0), [eChar.SPACE, eChar.NEW_ROW]) === -1;
    }

    /**
    * Make space readable for web
    *
    * @param {Array<String>} chars
    * @return {Array<String>}
    */
    var makeSpaces = function(chars) {
        var newList = [];

        $(chars).each(function(iterator, char){
            newList.push(char.replace(/\s/ig, '&nbsp;'));
        });

        return newList;
    }

    /**
     * Cover each word in <span/>
     *
     * @param {Array<String>} chars
     * @return {Array<String>}
     */
    var wrappWords = function(element) {
        var wrappedWords = [];

        $(new String(element.text())).each(function(i, word){
            if($.inArray(word.charCodeAt(0), [eChar.SPACE, eChar.NEW_ROW]) === -1) {
                wrappedWords.push('<span>' + word + '</span>');
            }
            else
            {
                wrappedWords.push(word);
            }
        });

        return wrappedWords;
    }

    var wrappWordsWithCHeck = function(element) {
        if(element.children().length > 0) {
            return;
        }
        element.html(wrappWords($this));
    }

    /**
    * Get random char from char list
    *
    * @param {Array<String>} chars
    * @return {String} random one element
    */
    var getRandomChar = function(chars) {
        return chars[Math.floor(Math.random() * (chars.length - 0) + 0)];
    }

    /***
     * Get next char by way
     *
     * @param {Array<String>} chars
     * @param {Number} iteration
     * @return {String} next one element
     */
    var getLineChar = function(chars, iteration) {
        return chars[iteration < chars.length ? iteration :
            (
                iteration - chars.length * Math.floor(iteration / chars.length)
            )];
    }

    /**
     * Get char by pattern
     *
     * @param {Array<Number>} pattern
     * @param {Number} iteration
     * @return {String} next element by pattern
     */
    var getCustomChar = function(chars, iteration, pattern) {
        var realIterator = iteration < pattern.length ? iteration :
            (
                iteration - pattern.length * Math.floor(iteration / pattern.length)
            );

        var checkedIterator = pattern[realIterator];

        if(checkedIterator >= chars.length) {
            checkedIterator = chars.length - 1;
        }

        return chars[checkedIterator];
    }

    /**
    * Get char by type iteration
    *
    * @param {Array<String>} chars
    * @param {Object} settings
    * @param {Number} iteration | default = 0
    * @param {Object} params
    * @return {String} next one element
    */
    var getCharByType = function(chars, type, iteration, params) {
        if(typeof iteration === 'undefined') {
            iteration = 0;
        }
        switch (type) {
            case 'random': return getRandomChar(chars);
            case 'line': return getLineChar(chars, iteration);
            case 'custom': {
                params.amountIterations = chars.length;
                return getCustomChar(chars, iteration, params.customOrder)
            };
        }
    }

    /**
    * Normalize color codes
    *
    * #123 => hex, 123 => hex, 123123 => hex, #123123 => hex, "123, 123, 123" => rgb, "123, 123, 123" => rgba
    * @param {string} color
    * @return {String} fixed color | default #CF3636
    */
    var colorNormalization = function(color) {

        var defaultColor = '#CF3636';

        if(typeof color === 'undefined') {
            return defaultColor;
        }

        color = color.replace(/\s/ig, '');


        if(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color)) {
            return color;
        }

        if(/^([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color)) {
            return '#' + color;
        }

        if(/^([0-9]{1,3},[0-9]{1,3},[0-9]{1,3})$/.test(color)) {
            return 'rgb(' + color + ')';
        }

        if(/^([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0-9]{1,3})$/.test(color)) {
            return 'rgba(' + color + ')';
        }

        return defaultColor;
    }

    /**
     * Append char to element
     *
     * @param {HTMLElement} element
     * @param {string} char
     * @return {Void}
     */
    var appendIterationChar = function(element, char, color) {
        element.append(
            '<span style="color: ' + color + ';" class="letmix--char">' + char + '</span>'
        );
    };

    /**
     * Remove appended char
     *
     * @param {HTMLElement} element
     * @return {Void}
     */
    var removeIterationChar = function(element) {
        element.find('.letmix--char').detach();
    }

    /**
     * Set color item by id
     *
     * @param {HTMLElement} element
     * @param {String} color
     * @param {Integer} id
     * @return {Void}
     */
    var setItemColorById = function(element, color, id) {
        $(element.children().get(id - 1)).css({ color: color });
    }

    /**
     * Clear color item by id
     *
     * @param {HTMLElement} element
     * @param {Integer} id
     * @return {Void}
     */
    var clearItemColorById = function(element, id) {
        $(element.children().get(id - 1)).css({ color: '' });
    }

    /**
     * Remove all spaces in text
     *
     * @param {String} text
     * @return {String}
     */
    var trimAll = function(text) {
        return text.replace(/\s/ig, '');
    }

    /**
    * Wait and run
    * @param {Function} callback
    * @param {Number} delay
    * @return {Void}
    */
    var wait = function(callback, delay, $this, words, settings) {
        if(delay > 0) {
            setTimeout(function(){
                callback($this, words, settings);
            }, delay);
        }
        else {
            callback($this, words, settings);
        }
    }

    /**
     * Runner core
     *
     */
    var runner = function(element, makeIteration, beforeNewIteration, callbackEnd, ifstop, sett) {
        function render(iterator) {

            iterator = makeIteration(element, iterator);

            setTimeout(function(){

                beforeNewIteration(element, iterator);

                if(ifstop(element, iterator)) {
                    render(iterator);
                }else{
                    callbackEnd();
                }
            }, sett.time);
        }
        render(sett.startIterator);
    }

    /**
     * Save text element before changes
     *
     * @param {String} text
     * @return {Void}
    */
    var setOriginalText = function(element) {
        if(typeof element.data('origin') === 'undefined') {
            element.data('origin', element.text());
        }
    };

    var getOriginalText = function(element) {
        return element.data('origin');
    }

    /**
    *
    */
    var makeThen = function(element) {

        if(element.data().callback.length > 0) {
            element.data().callback[0](element);
            element.data().callback = element.data().callback.splice(1, element.data().callback.length);
        }
    }

    /**
     * Make run from right side to left with settings
     *
     * @param {HTMLElement} element
     * @param {Object} sett
     * @param {Function} callback
     * @return {Void}
     */
    var runFromRightToLeft = function(element, sett, callback) {
        var wherePos = trimAll(getOriginalText(element)).indexOf(sett.stopWhere);

        sett.color = colorNormalization(sett.color);
        runner(element, function(e, i){
            setItemColorById(element, sett.color ? sett.color : colorNormalization(''), i);
            return --i;
        }, function(e, i){
            if(sett.stopWhere && i < (wherePos + sett.stopWhere.length)) {
                return;
            }
            clearItemColorById(element, i + 1);
        },function(){
            callback();
        }, function(e, i){
            if(sett.stopWhere.length === 0) {
                return i > 0;
            }
            return i > (wherePos);
        },{ time: sett.speed, startIterator: element.children().length + 1 });
    }

    /**
     * Make run from left side to right with settings
     *
     * @param {HTMLElement} element
     * @param {Object} sett
     * @param {Function} callback
     * @return {Void}
     */
    var runFromLeftToRight = function(element, sett, callback) {

        var wherePos = trimAll(getOriginalText(element)).indexOf(sett.stopWhere);

        sett.color = colorNormalization(sett.color);

        runner(element, function(e, i){
            setItemColorById(element, sett.color ? sett.color : colorNormalization(''), i);
            return ++i;
        }, function(e, i){
            if(sett.stopWhere && i > wherePos + 1) {
                return;
            }
            clearItemColorById(element, i - 1);
        },function(){
            callback();
        }, function(e, i){
            if(sett.stopWhere.length === 0) {
                return i < e.children().length;
            }
            return i <= wherePos + sett.stopWhere.length;
        },{ time: sett.speed, startIterator: 1, setting: sett, wherePos: wherePos });
    }

    /**
    * Run typing chars
    *
    */
    var start = function(element, words, settings) {

        // run start event
        settings.start(element);

        var _renderIteration = function(iterator, parentIterator, callback, endTypingCallback){

            // remove char if exist
            removeIterationChar(element);

            // get char by selected type
            var charByType = getCharByType(settings.chars, settings.typeIteration, iterator, settings);

            // append current char
            appendIterationChar(element, charByType, colorNormalization(settings.colorIteration));

            if(iterator < (settings.amountIterations > 0 ? settings.amountIterations : settings.chars.length)) {
                setTimeout(function(){
                    _renderIteration(++iterator, parentIterator, callback, endTypingCallback);
                }, settings.speedIteration);
            }
            else
            {
                // remove char
                removeIterationChar(element);
                callback();

                if(parentIterator == (words.length - 1)) {
                    endTypingCallback();
                }
            }
        }

        var _renderWord = function (iterator, endTypingCallback) {
            if(isBadChar(words[iterator])) {
                _renderIteration(0, iterator, function () {
                    element.append(words[iterator]);
                    iterator++;

                    if (words[iterator]) {
                        _renderWord(iterator, endTypingCallback);
                    }
                }, endTypingCallback);
            }
            else
            {
                element.append(words[iterator]);
                _renderWord(++iterator, endTypingCallback);
            }
        }

        _renderWord(0, function(){ // ended animate typing
            //
            element.data('inprogress', false);
            //
            settings.end(element);

            //
            makeThen(element);
        });
    }

    /**
    * Class functionals
    * Functions of core
    */
    var functionals = {

        /**
        *
        */
        initData: function(element) {
            if(!element.data('callback')) {
                element.data('callback', []);
            }
        },

        /**
         * Init starter data
         */
        init : function( options ) {
            var settings = $.extend({
                /**
                 * Amount of chars when is generation
                 * @var: integer
                 */
                amountIterations                        : 3,

                /**
                * Color iteration. hex
                * @var: string (#CF3636, CF3636)
                */
                colorIteration                          : 'CF3636',

                /**
                 * List of chars
                 * @var: array<string>
                 */
                chars                                   : ['A', 'a', 'B', 'b', 'C', 'c', '1', '2', '3'],

                /**
                * Type iteration. How will be get char from list.
                * random (get random item), line (get item by way), custom (get item by @customOrder)
                * @var: string
                 */
                typeIteration                           : 'random',

                /**
                * Custom order list
                * @var: array<number>
                */
                customOrder                             : [2, 1, 0],

                /**
                 * Speed for one iteration. -> A -> B
                 * @var: milliseconds | integer
                 */
                speedIteration                          : 30, // ms

                /**
                 * Wait some time & run
                 * @var: integer
                 */
                wait                                    : 0,

                /**
                 * Event start
                 */
                start                                   : function(){},

                /**
                 * Event finish
                 */
                end                                     : function(){}


            }, options);

            functionals.inited = true;

            return this.each(function(){
                $this = $(this);

                // inprogress
                if(typeof $this.data('inprogress') !== 'undefined') {
                    if($this.data('inprogress')) {
                        return false;
                    }
                }
                $this.data('inprogress', true);

                functionals.initData($this);

                // wrapp each of chars
                var words = wrappWords($this);

                // set original text for use later
                setOriginalText($this);

                // make space for web
                settings.chars = makeSpaces(settings.chars);

                // check for need delay
                wait(function($_this, _words, _settings){
                    // clear element inner html
                    clearElement($_this);

                    // start animations
                    start($_this, _words, _settings);
                }, settings.wait, $this, words, settings);
            });
        },
        runner: function(options){

            /**
             * Init starter data
             */
            var settings = $.extend({

                /**
                 * Speed run
                 * @var: integer
                 */
                speed                               : 50,

                /**
                 * Default color run char
                 * @var: string
                 */
                color                               : 'CF3636',

                /**
                 * Direction for run. <- ->
                 * @var: string
                 */
                direction                           : 'right=>left',

                /**
                 * Stop run where this text
                 * @var: integer
                 */
                stopWhere                           : '',

                /**
                 * Wait some time & run
                 * @var: integer
                 */
                wait                                : 0,

                /**
                 * Start runner event
                 */
                start                                 : function(){},

                /**
                * Finish runner event
                */
                end                                 : function(){}

            }, options);

            // delete all spaces for correct calculate
            settings.stopWhere = trimAll(settings.stopWhere);

            var $this = this;

            var canRun = false;

            if(
                typeof $this.data('direction') !== 'undefined' &&
                $.inArray($this, $this.data('direction')) > -1
            ) {
                return;
            }

            if(typeof $this.data('direction') === 'undefined') {
                $this.data('direction', [settings.direction]);
            } else {
                $this.data('direction').push(settings.direction);
            }
            
            $this.data('inprogress', true);

            wrappWordsWithCHeck($this);

            // Choose and make runner by settings
            function makeRunner(element) {
                switch(settings.direction) {
                    case 'right=>left' : {
                        runFromRightToLeft(element, settings, function(){
                            if(typeof settings.end !== 'undefined') {
                                element.data('inprogress', false);
                                element.data('direction', []);
                                //
                                settings.end(element);

                                //
                                makeThen(element);
                            }
                        });
                    }; break;
                    case 'left=>right' : {
                        runFromLeftToRight(element, settings, function(){
                            if(typeof settings.end !== 'undefined') {
                                element.data('inprogress', false);
                                element.data('direction', []);
                                //
                                settings.end(element);

                                //
                                makeThen(element);
                            }
                        });
                    }; break;
                }
            }

            return this.each(function(){
                $this = $(this);

                functionals.initData($this);

                setOriginalText($this);

                // wrapp each of chars
                var words = wrappWords($this);

                wait(function($_this, $_text, $_settings){
                    $_settings.start($_this);
                    makeRunner($_this, $_text, $_settings);
                }, settings.wait, $this, getOriginalText($this), settings);
            });
        }
    };

    $.fn['ThenFlash'] = function(callback) {
        return $this.each(function(iterator, element){

            $this = $(this);

            functionals.initData($this);

            $(element).data().callback.push(callback);
        });
    }

    $.fn['Letmix'] = function (nameMethod) {
        if ( functionals[nameMethod] ) {
            return functionals[ nameMethod ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof nameMethod === 'object' || ! nameMethod ) {
            return functionals.init.apply( this, arguments );
        } else {
            $.error( 'can\'t load method ' +  nameMethod );
        }
    };
}));
