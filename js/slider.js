(function (name, context, definition) {
    if (typeof define === 'function' && define.amd) {
        define(definition);
    }
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    }
    else {
        context[name] = definition();
    }
})('Slideshow', this, function() {


    function Slideshow(element) {
        this.target = element;
        this.runner = element.children[0];
        this.frames = element.children[0].children;

        if (!this.current) {
            this._init();
        }
    }

  
    Slideshow.prototype._init = function() {
        var self = this;

        this.current = 0;
        this.maximum = this.frames.length - 1;

        // Add next and previous buttons
        this.btnNext = document.createElement('button');
        this.btnPrev = document.createElement('button');
        this.btnNext.type = this.btnPrev.type = 'button';
        this.btnNext.className = 'next';
        this.btnPrev.className = 'prev';
        this.btnNext.innerHTML = 'Next slide';
        this.btnPrev.innerHTML = 'Previous slide';

        this.btnNext.onclick = function() {
            self.to(self.current + 1);
        };

        this.btnPrev.onclick = function() {
            self.to(self.current - 1);
        };

        this.target.appendChild(this.btnNext);
        this.target.appendChild(this.btnPrev);

        this.keyupHandler = function(e) {
            switch (e.keyCode) {
                case 37:
                    self.to(self.current - 1);
                    break;
                case 39:
                    self.to(self.current + 1);
                    break;
            }
        };

        if (this.target.addEventListener) {
            this.target.addEventListener('keyup', this.keyupHandler, true);
        }
        else {
            this.target.attachEvent('onkeyup', this.keyupHandler);
        }

        this.to(this.current);
    };


    Slideshow.prototype._loop = function(x) {
        if (x > this.maximum) {
            x = 0;
        }
        else if (x < 0) {
            x = this.maximum;
        }

        return x;
    };

 
    Slideshow.prototype.to = function(x) {
        x = this._loop(x);

        if (this.frames[x]) {
            this.before = this._loop(x - 1);
            this.current = x;
            this.after = this._loop(x + 1);

            this._update();
        }
    };


    Slideshow.prototype._update = function() {
        var classBefore = ' is-before ';
        var classCurrent = ' is-current ';
        var classAfter = ' is-after ';
        var classRegex = /is\-before|is\-current|is\-after/g;

        for (var i = 0, len = this.frames.length; i < len; i++) {
            this.frames[i].className = this.frames[i].className.replace(classRegex, '');
        }

        this.frames[this.before].className+= classBefore;
        this.frames[this.current].className+= classCurrent;
        this.frames[this.after].className+= classAfter;
    };


    Slideshow.prototype.teardown = function() {
        this.target.removeChild(this.btnNext);
        this.target.removeChild(this.btnPrev);

        if (this.target.removeEventListener) {
            this.target.removeEventListener('keyup', this.keyupHandler, true);
        }
        else {
            this.target.detachEvent('onkeyup', this.keyupHandler);
        }

        delete this.after;
        delete this.before;
        delete this.current;
        delete this.btnNext;
        delete this.btnPrev;
    };

    return Slideshow;

});

/* Init */ 
var slideshows = document.querySelectorAll('[data-directive=slideshow]');

for (var i = 0, len = slideshows.length; i < len; i++) {
    new Slideshow(slideshows[i]);
}