import xtend from 'xtend';

class Marquee {

    constructor(element, options = {}) {

        this.options = xtend(Marquee.options, options);
        

        this.element = element;
        this.marqueeWrapper;
        this.containerWidth;
        this.animationCss;
        this.verticalDir;
        this.elWidth;
        this.loopCount = 3;
        this.playState = 'animation-play-state';
        this.css3AnimationIsSupported = false;
        
        // Check for methods
        if (typeof options === 'string') {
            if ($.isFunction(methods[options])) {
                // Following two IF statements to support public methods
                if (!$marqueeWrapper) {
                    $marqueeWrapper = $this.find('.js-marquee-wrapper');
                }
                if ($this.data('css3AnimationIsSupported') === true) {
                    css3AnimationIsSupported = true;
                }
                methods[options]();
            }
        }
        
        
        this._init();
        this.isInitialized = true;
    }
    
    _init = function(){
    // If css3 animation is supported than call animate method at once
        if (css3AnimationIsSupported && .allowCss3Support) {
            this.animate();
        } else {
            // Starts the recursive method
            this._startAnimationWithDelay();
        }
    }
    
    _prefixedEvent = function(element, type, callback) {
        var pfx = ["webkit", "moz", "MS", "o", ""];
        for (var p = 0; p < pfx.length; p++) {
            if (!pfx[p]) type = type.toLowerCase();
            element.addEventListener(pfx[p] + type, callback, false);
        }
    }
    
    // Animate recursive method
    varanimate = function() {
        if (this.options.duplicated) {
            // When duplicated, the first loop will be scroll longer so double the duration
            if (loopCount === 1) {
                this.options._originalDuration = this.options.duration;
                if (verticalDir) {
                    this.options.duration = this.options.direction == 'up' ? this.options.duration + (containerHeight / ((elHeight) / this.options.duration)) : this.options.duration * 2;
                } else {
                    this.options.duration = this.options.direction == 'left' ? this.options.duration + (containerWidth / ((elWidth) / this.options.duration)) : this.options.duration * 2;
                }
                // Adjust the css3 animation as well
                if (animationCss3Str) {
                    animationCss3Str = animationName + ' ' + this.options.duration / 1000 + 's ' + this.options.delayBeforeStart / 1000 + 's ' + this.options.css3easing;
                }
                loopCount++;
            }
            // On 2nd loop things back to normal, normal duration for the rest of animations
            else if (loopCount === 2) {
                this.options.duration = this.options._originalDuration;
                // Adjust the css3 animation as well
                if (animationCss3Str) {
                    animationName = animationName + '0';
                    keyframeString = $.trim(keyframeString) + '0 ';
                    animationCss3Str = animationName + ' ' + this.options.duration / 1000 + 's 0s infinite ' + this.options.css3easing;
                }
                loopCount++;
            }
        }

        if (verticalDir) {
            if (this.options.duplicated) {

                // Adjust the starting point of animation only when first loops finishes
                if (loopCount > 2) {
                    this.marqueeWrapper.css('margin-top', this.options.direction == 'up' ? 0 : '-' + elHeight + 'px');
                }

                animationCss = {
                    'margin-top': this.options.direction == 'up' ? '-' + elHeight + 'px' : 0
                };
            } else if (this.options.startVisible) {
                // This loop moves the marquee out of the container
                if (loopCount === 2) {
                    // Adjust the css3 animation as well
                    if (animationCss3Str) {
                        animationCss3Str = animationName + ' ' + this.options.duration / 1000 + 's ' + this.options.delayBeforeStart / 1000 + 's ' + this.options.css3easing;
                    }
                    animationCss = {
                        'margin-top': this.options.direction == 'up' ? '-' + elHeight + 'px' : containerHeight + 'px'
                    };
                    loopCount++;
                } else if (loopCount === 3) {
                    // Set the duration for the animation that will run forever
                    this.options.duration = this.options._completeDuration;
                    // Adjust the css3 animation as well
                    if (animationCss3Str) {
                            animationName = animationName + '0';
                            keyframeString = $.trim(keyframeString) + '0 ';
                            animationCss3Str = animationName + ' ' + this.options.duration / 1000 + 's 0s infinite ' + this.options.css3easing;
                    }
                    _rePositionVertically();
                }
            } else {
                _rePositionVertically();
                animationCss = {
                    'margin-top': this.options.direction == 'up' ? '-' + (this.marqueeWrapper.height()) + 'px' : containerHeight + 'px'
                };
            }
        } else {
            if (this.options.duplicated) {

                // Adjust the starting point of animation only when first loops finishes
                if (loopCount > 2) {
                    this.marqueeWrapper.css('margin-left', this.options.direction == 'left' ? 0 : '-' + elWidth + 'px');
                }

                animationCss = {
                    'margin-left': this.options.direction == 'left' ? '-' + elWidth + 'px' : 0
                };

            } else if (this.options.startVisible) {
                // This loop moves the marquee out of the container
                if (loopCount === 2) {
                    // Adjust the css3 animation as well
                    if (animationCss3Str) {
                        animationCss3Str = animationName + ' ' + this.options.duration / 1000 + 's ' + this.options.delayBeforeStart / 1000 + 's ' + this.options.css3easing;
                    }
                    animationCss = {
                        'margin-left': this.options.direction == 'left' ? '-' + elWidth + 'px' : containerWidth + 'px'
                    };
                    loopCount++;
                } else if (loopCount === 3) {
                    // Set the duration for the animation that will run forever
                    this.options.duration = this.options._completeDuration;
                    // Adjust the css3 animation as well
                    if (animationCss3Str) {
                        animationName = animationName + '0';
                        keyframeString = $.trim(keyframeString) + '0 ';
                        animationCss3Str = animationName + ' ' + this.options.duration / 1000 + 's 0s infinite ' + this.options.css3easing;
                    }
                    _rePositionHorizontally();
                }
            } else {
                _rePositionHorizontally();
                animationCss = {
                    'margin-left': this.options.direction == 'left' ? '-' + elWidth + 'px' : containerWidth + 'px'
                };
            }
        }

        // fire event
        $this.trigger('beforeStarting');

        // If css3 support is available than do it with css3, otherwise use jQuery as fallback
        if (css3AnimationIsSupported) {
            // Add css3 animation to the element
            this.marqueeWrapper.css(animationString, animationCss3Str);
            var keyframeCss = keyframeString + ' { 100%  ' + _objToString(animationCss) + '}',
                 $styles = this.marqueeWrapper.find('style');

            // Now add the keyframe animation to the marquee element
            if ($styles.length !== 0) {
                // Bug fixed for jQuery 1.3.x - Instead of using .last(), use following
                $styles.filter(":last").html(keyframeCss);
            } else {
                $('head').append('<style>' + keyframeCss + '</style>');
            }

            // Animation iteration event
            _prefixedEvent(this.marqueeWrapper[0], "AnimationIteration", function() {
                $this.trigger('finished');
            });
            // Animation stopped
            _prefixedEvent(this.marqueeWrapper[0], "AnimationEnd", function() {
                animate();
                $this.trigger('finished');
            });

        } else {
            // Start animating
            this.marqueeWrapper.animate(animationCss, .duration, .easing, function() {
                // fire event
                $this.trigger('finished');
                // animate again
                if (.pauseOnCycle) {
                    _startAnimationWithDelay();
                } else {
                    animate();
                }
            });
        }
        // save the status
        $this.data('runningStatus', 'resumed');
    };

}

// Overrideable options
Marquee.options = {
    // If you wish to always animate using jQuery
    allowCss3Support: true,
    // works when allowCss3Support is set to true - for full list see http://www.w3.org/TR/2013/WD-css3-transitions-20131119/#transition-timing-function
    css3easing: 'linear',
    // requires jQuery easing plugin. Default is 'linear'
    easing: 'linear',
    // pause time before the next animation turn in milliseconds
    delayBeforeStart: 1000,
    // 'left', 'right', 'up' or 'down'
    direction: 'left',
    // true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: false,
    // speed in milliseconds of the marquee in milliseconds
    duration: 5000,
    // gap in pixels between the tickers
    gap: 20,
    // on cycle pause the marquee
    pauseOnCycle: false,
    // on hover pause the marquee - using jQuery plugin https://github.com/tobia/Pause
    pauseOnHover: false,
    // the marquee is visible initially positioned next to the border towards it will be moving
    startVisible: false
};
export default Marquee;